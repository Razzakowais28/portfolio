import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const OVERRIDES: Record<
  string,
  { status_key: string; label: string; icon: string; active: boolean }
> = {
  "scrolling-reels": {
    status_key: "scrolling_reels",
    label: "SCROLLING REELS",
    icon: "📱",
    active: true,
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const state = url.searchParams.get("state")?.toLowerCase() ?? "";
  const token = url.searchParams.get("token") ?? "";

  if (token !== Deno.env.get("STATUS_TOKEN")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: corsHeaders,
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  if (state === "clear" || state === "normal" || state === "") {
    await supabase.from("live_status_override").delete().eq("id", 1);
    return new Response(JSON.stringify({ ok: true, override: null }), {
      headers: corsHeaders,
    });
  }

  const override = OVERRIDES[state];
  if (!override) {
    return new Response(
      JSON.stringify({
        error: "Unknown state",
        allowed: [...Object.keys(OVERRIDES), "clear", "normal"],
      }),
      { status: 400, headers: corsHeaders },
    );
  }

  const { error } = await supabase.from("live_status_override").upsert({
    id: 1,
    ...override,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  return new Response(JSON.stringify({ ok: true, override }), {
    headers: corsHeaders,
  });
});
