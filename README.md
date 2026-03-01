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

## ✨ Fitur Unggulan

| Fitur | Deskripsi |
|---|---|
| 🏙️ **Destinasi Jakarta** | 22+ hidden gems dengan detail lengkap, galeri foto, peta, dan tips |
| 🎉 **Event Lokal** | 14+ event Jakarta dengan info tanggal, lokasi, dan kategori |
| 🔐 **Auth System** | Register & login dengan JWT + bcrypt, httpOnly cookies |
| 👤 **Role-Based Access** | Mode **User** (explore, favorit, review) & **Administrator** (kelola konten) |
| ❤️ **Favorit** | Simpan destinasi favorit — tersimpan di localStorage per user |
| ⭐ **Review System** | Tulis, edit, dan hapus review dengan rating bintang 1–5 |
| 🎛️ **Admin Dashboard** | Tambah & hapus destinasi/event langsung dari UI |
| 🎬 **Hero Cinematic** | Image sequence animation di hero section |
| ✨ **Hover Effect** | Wipe transition antar foto di setiap card destinasi |
| 📱 **Responsive** | Desain adaptif untuk semua ukuran layar |

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

## 📁 Struktur Project

```
jakspot/
├── app/
│   ├── page.tsx                        # Homepage
│   ├── layout.tsx                      # Root layout + providers
│   ├── globals.css                     # CSS variables & global styles
│   ├── components/                     # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── DestinationsSection.tsx
│   │   ├── CulinarySection.tsx
│   │   ├── CultureSection.tsx
│   │   ├── EventSection.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── ParallaxBridge.tsx
│   ├── context/
│   │   ├── AuthContext.tsx             # Auth state + login/signup/logout
│   │   └── FavoritesContext.tsx        # Favorites (localStorage)
│   ├── data/
│   │   ├── destinations.ts             # 22+ data destinasi
│   │   └── events.ts                   # 14+ data event
│   ├── destinations/
│   │   ├── page.tsx                    # Daftar destinasi + filter
│   │   └── [slug]/
│   │       ├── page.tsx                # Detail destinasi + reviews
│   │       └── reviews/page.tsx        # Semua review destinasi
│   ├── event/
│   │   ├── page.tsx                    # Daftar event
│   │   └── [slug]/page.tsx             # Detail event
│   ├── admin/page.tsx                  # Dashboard admin
│   ├── profile/page.tsx                # Halaman profil user
│   ├── signin/page.tsx                 # Login + role selector
│   ├── signup/page.tsx                 # Register + role selector
│   ├── about/ | faq/ | privacy/ | terms/
│   └── api/
│       ├── auth/signin | signup | me | signout
│       ├── reviews/route.ts            # CRUD reviews
│       └── admin/data/route.ts         # Admin manage konten
├── lib/
│   ├── auth.ts                         # JWT + bcrypt utilities
│   └── prisma.ts                       # DB client + auto-migration
└── public/
    ├── Destination/                    # Foto destinasi
    └── image-sequences-hero-section/   # Frame animasi hero
```

---

## 🔑 Environment Variables

| Variable | Deskripsi | Wajib |
|---|---|---|
| `JWT_SECRET` | Secret key untuk signing JWT token | ✅ |

---

## 👥 Role System

### 👤 User
- Melihat semua destinasi & event
- Menyimpan destinasi ke favorit
- Menulis, mengedit, dan menghapus review sendiri
- Halaman profil dengan tab favorit

### 🔧 Administrator
- Semua akses user
- Menambah destinasi & event baru via dashboard `/admin`
- Menghapus destinasi & event

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Daftar akun baru | — |
| `POST` | `/api/auth/signin` | Login | — |
| `GET` | `/api/auth/me` | Info user aktif | Cookie |
| `POST` | `/api/auth/signout` | Logout | Cookie |
| `GET` | `/api/reviews?slug=xxx` | Ambil review destinasi | — |
| `POST` | `/api/reviews` | Kirim review baru | User |
| `PUT` | `/api/reviews` | Edit review | Owner |
| `DELETE` | `/api/reviews?id=xxx` | Hapus review | Owner/Admin |
| `GET` | `/api/admin/data?type=...` | Ambil data destinasi/event | Admin |
| `POST` | `/api/admin/data` | Tambah destinasi/event | Admin |
| `DELETE` | `/api/admin/data?type=...&slug=xxx` | Hapus destinasi/event | Admin |

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
