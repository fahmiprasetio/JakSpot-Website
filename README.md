# JakSpot Website

JakSpot adalah website panduan Jakarta untuk destinasi wisata, kuliner, budaya, dan event lokal. Fokus utama project ini ada di pengalaman jelajah yang cepat, visual, dan mudah dipakai.

Live demo: https://jakspot-website-icnfcllut-fahmiprasetios-projects.vercel.app/

## Fitur

- Beranda dengan hero animasi
- Daftar destinasi dan detail lokasi
- Halaman event lokal
- Login, signup, profil, dan admin dashboard
- Review destinasi dari pengguna

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS v4
- SQLite
- JWT auth

## Jalankan Lokal

```bash
npm install
npm run dev
```

Buat file `.env` atau `.env.local` dengan:

```env
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
```

## Catatan

- Jika port 3000 dipakai, Next akan pindah ke port lain.
- Di Windows, bila Turbopack bermasalah, dev server lebih stabil dengan mode default setelah cache dibersihkan.
