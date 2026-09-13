-- FNDRS Society — early access waitlist
--
-- Run this once in the Supabase SQL editor (or via the CLI), then set
-- SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the website environment.

create table if not exists public.waitlist_signups (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  email        text        not null,
  name         text,
  role         text,
  building     text,
  looking_for  text,
  source       text        not null default 'website',
  referrer     text,
  locale       text,
  invited_at   timestamptz,
  notes        text
);

comment on table public.waitlist_signups is
  'Early access requests submitted through the marketing site.';

-- One row per address, case-insensitively. The API turns the resulting
-- unique violation into a friendly "you are already on the list" response.
create unique index if not exists waitlist_signups_email_unique
  on public.waitlist_signups (lower(email));

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

-- Row level security on with no policies: anon and authenticated clients get
-- nothing. The website talks to this table with the service role key from a
-- server route handler only, which bypasses RLS by design.
alter table public.waitlist_signups enable row level security;

revoke all on public.waitlist_signups from anon, authenticated;
