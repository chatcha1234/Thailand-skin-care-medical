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
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `NEXT_PUBLIC_APP_URL`

## Run locally

```bash
npm install
npm run dev
```

## Production notes

- The site includes educational and coordination flows only.
- It is not a diagnosis platform.
- Final treatment decisions must remain with licensed medical professionals.
