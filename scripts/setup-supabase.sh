#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${SUPABASE_ACCESS_TOKEN:-}" ]]; then
  echo "Missing SUPABASE_ACCESS_TOKEN"
  exit 1
fi

PROJECT_NAME="${PROJECT_NAME:-portfolio-live-status}"
DB_PASSWORD="${DB_PASSWORD:-$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 24)}"
STATUS_TOKEN="${STATUS_TOKEN:-$(openssl rand -hex 16)}"
REGION="${REGION:-ap-southeast-1}"

echo "Fetching Supabase organizations..."
ORG_ID="$(npx supabase orgs list --output json | node -e "
  const orgs = JSON.parse(require('fs').readFileSync(0, 'utf8'));
  if (!orgs.length) {
    console.error('No Supabase organizations found on this account.');
    process.exit(1);
  }
  console.log(orgs[0].id);
")"

echo "Creating project: ${PROJECT_NAME}"
CREATE_OUTPUT="$(npx supabase projects create "${PROJECT_NAME}" \
  --org-id "${ORG_ID}" \
  --db-password "${DB_PASSWORD}" \
  --region "${REGION}" \
  --output json)"

PROJECT_REF="$(node -e "
  const data = JSON.parse(process.argv[1]);
  console.log(data.id || data.ref || data.project_ref);
" "${CREATE_OUTPUT}")"

echo "Waiting for project ${PROJECT_REF} to become active..."
for _ in $(seq 1 60); do
  STATUS="$(npx supabase projects list --output json | node -e "
    const projects = JSON.parse(require('fs').readFileSync(0, 'utf8'));
    const project = projects.find((item) => item.id === process.argv[1]);
    console.log(project?.status || 'UNKNOWN');
  " "${PROJECT_REF}")"

  if [[ "${STATUS}" == "ACTIVE_HEALTHY" ]]; then
    break
  fi

  sleep 10
done

echo "Linking local repo to ${PROJECT_REF}..."
npx supabase link --project-ref "${PROJECT_REF}"

echo "Applying database migration..."
npx supabase db push

echo "Setting edge function secret..."
npx supabase secrets set "STATUS_TOKEN=${STATUS_TOKEN}"

echo "Deploying edge function..."
npx supabase functions deploy set-live-status

API_KEYS="$(npx supabase projects api-keys --project-ref "${PROJECT_REF}" --output json)"
SUPABASE_URL="https://${PROJECT_REF}.supabase.co"
ANON_KEY="$(node -e "
  const keys = JSON.parse(process.argv[1]);
  const anon = keys.find((item) => item.name === 'anon');
  console.log(anon?.api_key || '');
" "${API_KEYS}")"

cat <<EOF

Setup complete.

Add these GitHub Actions variables in your repo:
  VITE_SUPABASE_URL=${SUPABASE_URL}
  VITE_SUPABASE_ANON_KEY=${ANON_KEY}

Use this token in your iOS Shortcut:
  STATUS_TOKEN=${STATUS_TOKEN}

Opened Instagram:
  ${SUPABASE_URL}/functions/v1/set-live-status?state=scrolling-reels&token=${STATUS_TOKEN}

Closed Instagram:
  ${SUPABASE_URL}/functions/v1/set-live-status?state=normal&token=${STATUS_TOKEN}

Database password (save somewhere safe):
  ${DB_PASSWORD}
EOF
