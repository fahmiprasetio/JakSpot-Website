<div align="center">

# 🗺️ JakSpot

### *Jelajahi Jakarta lewat lensa yang beda.*

**Panduan destinasi Jakarta modern dengan vibes Gen Z — dari hidden gems, kopi specialty, bar tersembunyi, sampai event lokal yang wajib dikunjungi.**

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://jakspot-website-icnfcllut-fahmiprasetios-projects.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

<br/>

> 🌐 **Lihat versi live:** [jakspot-website-icnfcllut-fahmiprasetios-projects.vercel.app](https://jakspot-website-icnfcllut-fahmiprasetios-projects.vercel.app/)

</div>

---

## 🖥️ Preview

### Halaman Utama
- **Hero section** dengan animasi image sequence sinematik
- **Destinasi cards** dengan efek wipe hover + tombol simpan favorit
- Section **Culinary**, **Culture**, dan **Event**

### Halaman Destinasi
- Grid destinasi dengan filter kategori
- Detail page: galeri, highlights, tips, peta Google Maps
- Section review dari pengunjung (max 3 ditampilkan, tombol lihat semua)
- Dedicated review page dengan distribusi rating bintang

### Auth & Profil
- Halaman signin/signup dengan **role selector** (User vs Administrator)
- Profile page dengan tab favorit tersimpan
- Admin dashboard dengan tab Destinasi & Event

---

## 🛠️ Tech Stack

```
Framework   : Next.js 16.1.6 (App Router + Turbopack)
Language    : TypeScript
Styling     : Custom CSS Variables + Tailwind CSS v4
Database    : SQLite via @libsql/client (direct SQL)
Auth        : JWT (jsonwebtoken) + bcryptjs
State       : React Context API
Deployment  : Vercel
```

---

## 🚀 Menjalankan Lokal

### Prasyarat
- Node.js 18+
- npm

### Langkah Instalasi

```bash
# 1. Clone repo
git clone https://github.com/fahmiprasetio/JakSpot-Website.git
cd JakSpot-Website

# 2. Install dependencies
npm install

# 3. Buat file environment
```

Buat file `.env.local` di root project:

```env
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
```

```bash
# 4. Jalankan dev server
npm run dev
```

> ⚠️ **Catatan Windows:** Jika path project mengandung karakter `&`, gunakan:
> ```bash
> node node_modules/next/dist/bin/next dev
> ```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

##  Environment Variables

| Variable | Deskripsi | Wajib |
|---|---|---|
| `JWT_SECRET` | Secret key untuk signing JWT token | ✅ |

---

## 🎨 Design System

```css
--primary:        #ff6b35   /* Orange utama */
--background:     #0a0a0f   /* Dark background */
--dark-surface:   #111118
--dark-surface-2: #16161f
--dark-surface-3: #1e1e2a
--text-muted:     #6b7280
--gradient-1:     linear-gradient(135deg, #ff6b35, #f7c059)
```

---

## 📦 Deploy ke Vercel

1. Push ke GitHub
2. Import repo di [vercel.com](https://vercel.com)
3. Set environment variable:
   - `JWT_SECRET` = *(string rahasia panjang, min. 32 karakter)*
4. Klik **Deploy**

---

<div align="center">

Made with ☕ and 🧡 for Jakarta

**[🔗 jakspot-website-icnfcllut-fahmiprasetios-projects.vercel.app](https://jakspot-website-icnfcllut-fahmiprasetios-projects.vercel.app/)**

</div>
