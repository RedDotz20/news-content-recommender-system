# 🧠 Hybrid Recommendation Algorithm

A full-stack web application implementing a hybrid article recommendation engine using **Content-Based Filtering** and **Collaborative Filtering**, built with **Next.js**, **TypeScript**, **Prisma**, **Supabase**, and **TailwindCSS**.

---

## 🚀 Project Setup

### ✅ Prerequisites

- Node.js v18+
- Supabase account with PostgreSQL
- Git
- Bun (or npm/yarn/pnpm)
- Recommended: Visual Studio Code (for `REACT_EDITOR` integration)

---

### 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/RedDotz20/news-content-recommender-system.git
cd news-content-recommender-system
```

2. **Install dependencies**

```bash
bun install
# or npm install / yarn install / pnpm install
```

3. **Create and configure environment variables**
Copy .env.example and fill in .env.local:
```bash
cp .env.example .env.local
```
Fill out all necessary fields:
```bash
# Supabase Database URL
DATABASE_URL=

# Supabase Env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Oauth Google Provider
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Facebook OAuth Provider
AUTH_FACEBOOK_ID=
AUTH_FACEBOOK_SECRET=

# API Route Secret Key
API_SECRET_KEY=

# React editor integration (local only)
REACT_EDITOR=code

```

### 🛠️ Database Setup (Prisma + Supabase)
1. Generate Prisma client
```bash
npx prisma generate
```

3. Run migrations:
```bash
npx prisma migrate dev --name init
```

5. (Optional) seed database if applicable:
```bash
npx prisma db seed
```

### 🧪 Running the Application
```bash
bun run dev
# or npm run dev / yarn dev / pnpm dev
```

### 🗂️ Project Structure
```bash
src/
├── app/                    # App Router (Next.js 14+)
│   ├── (auth)/             # Authentication pages
│   ├── api/                # API routes (Next.js handlers)
│   ├── home/               # Homepage
│   ├── legal/              # Terms, privacy pages
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/             # Shared UI components (buttons, cards, etc.)
├── features/               # Feature-specific logic
├── hooks/                  # Custom React hooks
│
├── lib/
│   ├── algorithms/         # Core recommendation logic
│   │   ├── collaborativeFiltering/     # CF logic
│   │   ├── contentBasedFiltering/      # CBF logic
│   │   ├── hybridRecommendation/       # Combines CF + CBF
│   │   └── helper/                     # Utility functions (similarity, normalization)
│   ├── db.ts               # Prisma DB connection
│   ├── index.ts
│   ├── safe-action.ts      # Safe action pattern for server actions
│   └── utils.ts
│
├── types/                  # Global TS types/interfaces
└── middleware.ts           # Auth + protected routes
```

### ⚙️ Environment File Reference
| File    | Description |
| -------- | ------- |
| `.env.local`  | Development-only configuration |
| `.env.production` | Production deployment configuration |
| `.env.example`    | Template showing required keys|

### 🧠 Algorithm Architecture
All algorithmic logic is encapsulated in `lib/algorithms/`:
- Content-Based Filtering: 
Recommends based on article keywords, category, and matching user preferences.

- Collaborative Filtering: 
Suggests based on interaction patterns of similar users (likes, clicks, bookmarks).

- Hybrid Recommendation: 
Smartly merges both approaches with weight-based control.

- Helpers: 
Utility functions for computing cosine similarity, vector scores, and merging results.

### 📌 Developer Notes
- Use `REACT_EDITOR=code` in `.env.local` for better stack traces
- You can extend the recommendation logic in `lib/algorithms/hybridRecommendation/`
- Secure API routes using the secret key in `API_SECRET_KEY`
