create extension if not exists "pgcrypto";

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  full_name text not null,
  age_range text not null,
  gender text not null,
  country text not null,
  skin_concern text not null,
  duration text not null,
  previous_treatment text not null default '',
  allergy text not null default '',
  medication text not null default '',
  budget_range text not null,
  photo_url text not null,
  photo_quality_score int not null,
  photo_status text not null,
  photo_feedback text not null default '',
  readiness_score int not null,
  summary text not null
);

create index if not exists patients_created_at_idx on public.patients (created_at desc);
create index if not exists patients_skin_concern_idx on public.patients (skin_concern);

create table if not exists public.international_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  full_name text not null,
  country text not null,
  concern text not null,
  preferred_travel_month text not null,
  budget_range text not null,
  email text not null,
  whatsapp text not null default '',
  preferred_city text not null default '',
  notes text not null default '',
  photo_url text not null default '',
  ai_primary_concern text not null default '',
  ai_confidence_score int not null default 0,
  ai_photo_quality_status text not null default '',
  ai_photo_quality_feedback text not null default '',
  ai_recommended_treatments text not null default '',
  ai_summary text not null default '',
  ai_disclaimer text not null default ''
);

create index if not exists international_leads_created_at_idx on public.international_leads (created_at desc);
