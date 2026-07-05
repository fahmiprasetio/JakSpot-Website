# JakSpot Website

JakSpot adalah website panduan Jakarta untuk menemukan destinasi wisata, kuliner, budaya, dan event lokal. Dibangun sebagai aplikasi fullstack dengan Next.js dan database PostgreSQL.

## Fitur

- Beranda dengan hero animasi
- Daftar destinasi dan halaman detail lokasi
- Halaman event lokal beserta detailnya
- Autentikasi pengguna (signup, signin, profil)
- Review destinasi dari pengguna
- Admin dashboard untuk mengelola destinasi & event

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma ORM
- Autentikasi berbasis JWT

## Menjalankan Secara Lokal

1. Install dependencies:

   ```bash
   npm install
   ```

2. Siapkan database PostgreSQL, lalu salin `.env.example` menjadi `.env` dan isi variabel yang dibutuhkan.

3. Siapkan skema & data awal:

   ```bash
   npm run db:push
   npm run db:seed
   ```

4. Jalankan development server:

   ```bash
   npm run dev
   ```

   Lalu buka http://localhost:3000 di browser.

## Deployment

Aplikasi dapat di-deploy ke platform seperti Vercel. Pastikan seluruh environment variables yang dibutuhkan (lihat `.env.example`) sudah dikonfigurasi di dashboard hosting, kemudian jalankan migrasi dan seed untuk database production.

## Lisensi

Proyek ini dibuat untuk keperluan pembelajaran & portofolio.
