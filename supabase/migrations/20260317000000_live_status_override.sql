create table if not exists public.live_status_override (
  id int primary key default 1 check (id = 1),
  status_key text not null,
  label text not null,
  icon text not null default '📱',
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.live_status_override enable row level security;

create policy "Anyone can read live status override"
  on public.live_status_override
  for select
  to anon, authenticated
  using (true);
