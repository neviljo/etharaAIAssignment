# Deployment Guide

## Railway Deployment

1. **Database:** Add a PostgreSQL plugin in Railway.
2. **Environment Variables:**
   - `DATABASE_URL`: Automatically set by Railway.
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`.
   - `NEXTAUTH_URL`: Your Railway app URL.
   - `NODE_ENV`: Set to `production`.
3. **Build Settings:**
   - Railway will use `railway.json` for build commands.
   - It runs `npm run db:generate && npm run build`.

## Local Setup

1. Copy `.env.example` to `.env.local`.
2. Set your local PostgreSQL `DATABASE_URL`.
3. Run `npm install`.
4. Run `npx prisma migrate dev`.
5. Run `npm run dev`.
