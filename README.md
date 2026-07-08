# PestCo AI Lead Automation

AI lead qualification and CRM automation demo for pest control / home service businesses.

## Why This Workflow Matters

- Faster response to urgent leads such as termites, rodents, or commercial kitchen roach issues.
- Better lead prioritization for service teams and sales reps.
- Less manual CRM work through automated field mapping and opportunity creation.
- Cleaner sales pipeline visibility with status tracking and dashboard reporting.

## Architecture

```mermaid
flowchart LR
  A[Lead Form] --> B[Next.js API]
  B --> C[AI Scoring Service]
  C --> D[Supabase Postgres via Prisma]
  D --> E[Mock GHL Webhook]
  E --> F[Dashboard / Slack]
  D --> F
```

## Features

- Lead intake form with Zod validation.
- Deterministic mock AI scoring enabled by default with `USE_MOCK_AI=true`.
- Optional real OpenAI scoring when `USE_MOCK_AI=false` and `OPENAI_API_KEY` is present.
- Prisma schema for Supabase Postgres.
- REST API routes for creating, filtering, reading, and updating leads.
- Mock GoHighLevel-style webhook that maps lead data into CRM custom fields.
- Optional Slack notification for high-priority leads.
- Dashboard with analytics cards, filters, status updates, reset button, and Recharts chart.
- Bundled sample-data fallback when database env vars are missing.
- n8n workflow example for high-score lead automation.

## Tech Stack

- Next.js App Router
- TypeScript
- Prisma
- Supabase Postgres
- Zod
- Recharts
- OpenAI SDK
- Astryx design system packages with neutral theme CSS

## Local Setup

```powershell
npm install
npm run prisma:generate
npm run dev
```

Open `http://localhost:3000`.

The app works in mock AI mode by default. Without database env vars, API routes return bundled sample data and simulated writes so the UI can still be reviewed.

## Supabase Setup

1. Create or open the Supabase project.
2. Go to Project Settings -> Database -> Connection string.
3. Copy the pooled connection string into `DATABASE_URL`.
4. Copy the direct connection string into `DIRECT_URL`.
5. Replace `[YOUR-PASSWORD]` with the Supabase database password.
6. Keep these values in `.env` or `.env.local`; do not commit them.

## Environment Variables

Create `.env` for Prisma CLI commands and `.env.local` for local Next.js runtime:

```env
DATABASE_URL="postgresql://postgres.flrmcbmcwkgztclhfayg:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.flrmcbmcwkgztclhfayg:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
OPENAI_API_KEY=""
USE_MOCK_AI=true
SLACK_WEBHOOK_URL=""
```

## Prisma Commands

Run these after `.env` has real Supabase connection strings:

```powershell
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
npm run dev
```

Useful commands:

```powershell
npm run prisma:migrate -- --name init
npm run prisma:studio
npm run build
```

## Mock AI Mode vs Real OpenAI Mode

Mock mode is the default and requires no OpenAI API key:

```env
USE_MOCK_AI=true
```

Real mode calls OpenAI only when both conditions are true:

```env
USE_MOCK_AI=false
OPENAI_API_KEY="your-key"
```

AI output is parsed with Zod. If the model returns invalid JSON or incomplete fields, the service falls back to deterministic mock scoring so the demo remains usable.

## Mock GoHighLevel Webhook

`POST /api/mock-ghl-webhook` simulates mapping a qualified lead into CRM custom fields:

- `contact_name`
- `phone`
- `email`
- `pest_type`
- `service_requested`
- `lead_score`
- `urgency`
- `ai_summary`
- `recommended_reply`
- `pipeline_stage`

The mock GoHighLevel webhook is designed to be swapped with a real GHL workflow trigger/API call.

## Screenshot / GIF Placeholder

Add a dashboard screenshot or short GIF here after deployment.

## Live Demo Placeholder

Add the deployed Vercel URL here after hosting.

## Implementation Notes

Astryx was installed and its reset/core/neutral theme CSS is imported globally. The CLI was available but `astryx init` required interactive theme scaffolding, so the implementation uses Astryx Button, Card, and Badge components directly plus local responsive CSS for the CRM dashboard layout.

The optional Supabase agent skills command succeeded and installed local `.agents` files, which are intentionally ignored because they are tool metadata rather than app source.

## Why I Built This

This was built as a technical demonstration for AI Specialist / Automation Developer roles in home-service businesses, especially workflows involving lead intake, AI qualification, CRM automation, and reporting.
