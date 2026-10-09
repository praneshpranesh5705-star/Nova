# NOVA HUB

NOVA HUB is an original AI knowledge, problem-solving, coding, document, publishing and live-project platform.

## What is implemented

- Next.js App Router + TypeScript foundation
- High-tech responsive landing page
- AI Lab workspace
- Knowledge Base workspace
- Problem Solver workspace
- Code Lab workspace
- Articles & Books publishing workspace
- Live Projects / IoT dashboard foundation
- Admin control center
- Supabase schema for Auth, documents, vector knowledge, content, projects and sensor readings
- Environment-variable template for Supabase and AI providers

## Source research

The publishing workflow was researched from the public `shinobi-coder701/zenn-docs` repository, especially its article/book creation, preview, draft, topic, image and review concepts. NOVA HUB does not install, copy or depend on that repository; the implementation is original.

## Technology direction

Next.js App Router and TypeScript form the application layer. Supabase is planned for PostgreSQL, Auth, Storage, Realtime and vector-backed knowledge. The AI layer is designed for model routing, vision, structured output, tool calling and retrieval-augmented generation.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Copy `.env.example` to `.env.local`.
4. Add the Supabase URL and publishable key.
5. Add the AI provider key when the AI backend is connected.

Do not commit real API keys.

## Production roadmap

1. Connect Supabase Auth and Storage.
2. Add document extraction and chunking.
3. Add embeddings and semantic retrieval.
4. Connect AI model routing and tool calling.
5. Add protected admin roles and production RLS review.
6. Add real article/book publishing and moderation.
7. Connect ESP32/IoT ingestion and Realtime dashboards.
8. Add analytics, notifications and mobile/PWA support.
