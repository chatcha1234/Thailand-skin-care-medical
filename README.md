# Thailand SkinCare Medical Tourism Platform

Marketing and lead-generation website for international patients seeking dermatology, aesthetic skin care, and treatment travel support in Thailand.

## What is included

- Conversion-focused homepage for international patient acquisition
- Treatment overview pages plus dynamic treatment detail pages
- Package overview pages plus dynamic package detail pages
- Doctors and clinics trust page
- How-it-works, reviews, FAQ, blog, and international patient support pages
- Consultation request form with Supabase-backed lead capture API
- AI skin concern pre-screening from uploaded photos with treatment direction matching

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase PostgreSQL
- Vercel-ready deployment

## Lead capture schema

Run [`supabase/schema.sql`](./supabase/schema.sql) to create:

- `patients`
- `international_leads`

The marketing site currently uses `international_leads` for consultation requests.
Each lead can also store AI pre-screening output, recommended treatment directions, and the uploaded photo URL.

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local` and provide real values for:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_AI_MODE`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_BASIC_AUTH_USER`
- `ADMIN_BASIC_AUTH_PASSWORD`

`NEXT_PUBLIC_AI_MODE=mock` lets the site return realistic demo AI results without calling OpenAI. Use `real` when you want live OpenAI analysis.

## Run locally

```bash
npm install
npm run dev
```

## Cloudflare Workers

This project is wired for Cloudflare Workers using OpenNext for Cloudflare.

Available commands:

```bash
npm run preview
npm run deploy
```

Before deploying, authenticate Wrangler:

```bash
npx wrangler login
```

Wrangler auth was not configured in this workspace yet, so live deploy still requires a one-time login.

If you want to run the OpenNext Cloudflare bundle locally, prefer WSL or a Linux/macOS environment. The OpenNext 0.6 build path is unreliable on native Windows paths and especially on folders with spaces.

## Lead dashboard

Open `/dashboard/leads` to review consultation requests, update lead status, assign an owner, and save staff follow-up notes.
Each new lead also receives AI lead scoring, a conversion summary, and a staff-facing follow-up brief.

The dashboard and lead update routes are protected with Basic Auth. Set `ADMIN_BASIC_AUTH_USER` and `ADMIN_BASIC_AUTH_PASSWORD` in `.env.local`, then sign in through the browser prompt before using `/dashboard/leads`.

If your `international_leads` table already exists, re-run [`supabase/schema.sql`](./supabase/schema.sql) so the new lead operations columns are added:

- `lead_status`
- `staff_notes`
- `assigned_to`
- `next_action_at`
- `contacted_at`
- `ai_lead_score`
- `ai_priority_label`
- `ai_conversion_summary`
- `ai_staff_summary`
- `ai_follow_up_reasons`

## Production notes

- The site includes educational and coordination flows only.
- It is not a diagnosis platform.
- Final treatment decisions must remain with licensed medical professionals.
