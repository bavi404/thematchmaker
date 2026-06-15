# The MatchMaker

Premium matrimonial CRM built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- Client directory with search, filters, and mobile card view
- Customer profiles with journey timeline, match recommendations, and meeting notes
- Gender-aware matching engine with compatibility explanations
- AI meeting note summarization (OpenAI)
- Analytics dashboard with Recharts
- Mock authentication for demo purposes

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env.local` and add your OpenAI key for AI summarization:

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Demo login:** `admin` / `cupid123`

## Deploy on Vercel

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `OPENAI_API_KEY` — required for meeting note AI summarization
   - `OPENAI_MODEL` (optional) — defaults to `gpt-4o-mini`
4. Deploy

No additional `vercel.json` is required; Next.js App Router works out of the box.

## Project Structure

```
app/                    # Routes and API
components/
  cupid-desk/           # Design system primitives
  matchmaker/           # Public design system API
  dashboard/            # Dashboard shell and widgets
  customer/             # Customer profile UI
  matching/             # Match cards and modals
  shared/               # Empty states, skeletons, error UI
lib/
  data/                 # Mock data (replace with DB in production)
  matching/             # Matching engine and explanations
  ai/                   # OpenAI integrations
  auth/                 # Session constants and verification
types/                  # Shared TypeScript types
middleware.ts           # Route and API protection
```

## Scripts

| Command         | Description          |
|----------------|----------------------|
| `npm run dev`  | Start dev server     |
| `npm run build`| Production build     |
| `npm run start`| Start production     |
| `npm run lint` | Run ESLint           |

## Production Notes

This MVP uses mock data and client-side persistence (`localStorage`) for sent matches and meeting notes. Before production:

- Replace `lib/data/*` with a database and server actions
- Replace mock auth with a proper auth provider (NextAuth, Clerk, etc.)
- Add rate limiting on `/api/meeting-notes/summarize`
