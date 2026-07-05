# JakSpot Website

JakSpot adalah website panduan Jakarta untuk destinasi wisata, kuliner, budaya, dan event lokal. Sekarang berjalan sebagai aplikasi **fullstack** dengan backend berbasis **Supabase (PostgreSQL) + Prisma** — data destinasi & event tidak lagi hardcode, melainkan tersimpan di database.

Live demo: https://jakspot-website-icnfcllut-fahmiprasetios-projects.vercel.app/

## Fitur

- Beranda dengan hero animasi
- Daftar destinasi dan halaman detail lokasi
- Halaman event lokal dan detailnya
- Autentikasi (signup, signin, profil) dengan JWT + bcrypt
- Admin dashboard untuk kelola destinasi & event (CRUD ke database)
- Review destinasi dari pengguna

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- PostgreSQL (Supabase)
- Prisma ORM
- JWT auth (jsonwebtoken) + bcryptjs

## Arsitektur data

Semua data dinamis disimpan di database (bukan hardcode lagi):

- Tabel Prisma: `User`, `Review`, `Destination`, `Event`.
- File `app/data/destinations.ts` & `app/data/events.ts` kini hanya dipakai sebagai **sumber seed** dan definisi tipe.
- REST API:
  - `GET /api/destinations`, `GET /api/destinations/[slug]`
  - `GET /api/events`, `GET /api/events/[slug]`
  - `GET/POST/PUT/DELETE /api/reviews`
  - `POST /api/auth/signup|signin`, `GET /api/auth/me`, `PUT /api/auth/profile`, `POST /api/auth/logout`
  - `GET/POST/DELETE /api/admin/data` (admin only)

## Setup lokal

1. Install dependencies:

   ```bash
   npm install
   ```

2. Buat project di [Supabase](https://supabase.com). Buka **Project Settings → Database → Connection string**, ambil dua URL: **Transaction pooler (port 6543)** untuk `DATABASE_URL` dan **Session/Direct (port 5432)** untuk `DIRECT_URL`.

3. Salin `.env.example` menjadi `.env` lalu isi:

   ```env
   DATABASE_URL="postgresql://...:6543/postgres?pgbouncer=true&connection_limit=1"
   DIRECT_URL="postgresql://...:5432/postgres"
   JWT_SECRET="minimal-32-karakter-rahasia"
   ADMIN_EMAIL="admin@jakspot.id"
   ADMIN_PASSWORD="password-admin"
   ```

4. Buat tabel di database & isi data awal:

   ```bash
   npm run db:push    # buat tabel sesuai schema Prisma
   npm run db:seed    # isi destinasi, event, & akun admin
   ```

5. Jalankan development server:

   ```bash
   npm run dev
   ```

## Deploy ke Vercel

1. Set environment variables `DATABASE_URL`, `DIRECT_URL`, dan `JWT_SECRET` di dashboard Vercel.
2. Script `postinstall` otomatis menjalankan `prisma generate` saat build.
3. Jalankan `npm run db:push` (sekali) lalu `npm run db:seed` untuk mengisi database production.

> Catatan: versi sebelumnya memakai file SQLite lokal (`dev.db`) yang **tidak persisten** di serverless Vercel. Sekarang sudah dipindah ke Postgres cloud (Supabase) sehingga data user & review tersimpan permanen.
