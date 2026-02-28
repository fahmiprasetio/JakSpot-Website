'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

const sections = [
  {
    title: 'Definisi',
    content: [
      'Biar gak bingung, ini beberapa istilah yang sering muncul di dokumen ini:',
      '• **"JakSpot"** atau **"Kita"** — merujuk ke platform JakSpot, termasuk website dan semua layanan digital yang kita sediain.',
      '• **"Lo"** atau **"Pengguna"** — yap, itu lo. Siapa aja yang akses dan pake JakSpot.',
      '• **"Konten"** — semua informasi yang ada di JakSpot, termasuk teks, gambar, video, data destinasi, dan info event.',
      '• **"Layanan"** — fitur dan fungsi yang disediain JakSpot, termasuk pencarian destinasi, info event, dan newsletter.',
    ],
  },
  {
    title: 'Penerimaan Syarat',
    content: [
      'Dengan ngakses atau pake JakSpot, lo otomatis setuju sama semua syarat dan ketentuan di halaman ini. Kalau lo gak setuju, ya sebaiknya jangan pake layanan kita.',
      'Kita bisa update syarat ini kapan aja. Kalau ada perubahan besar, kita bakal kasih tau. Tapi tanggung jawab lo juga buat ngecek halaman ini sesekali.',
      '"Tapi gue gak pernah baca syarat & ketentuan" — well, sekarang udah baca kan? Good job! 😉',
    ],
  },
  {
    title: 'Penggunaan Layanan',
    content: [
      'Lo boleh pake JakSpot buat keperluan pribadi dan non-komersial. Artinya:',
      '• ✅ Browsing destinasi buat cari tempat nongkrong — silakan!',
      '• ✅ Share link JakSpot ke temen — go ahead!',
      '• ✅ Pake info di sini buat referensi jalan-jalan — that\'s the point!',
      '• ❌ Scraping atau nyolong konten kita buat website lo sendiri — jangan, bray.',
      '• ❌ Pake JakSpot buat aktivitas ilegal — obviously no.',
      '• ❌ Nyoba nge-hack atau ganggu sistem kita — please don\'t.',
    ],
  },
  {
    title: 'Hak Kekayaan Intelektual',
    content: [
      'Semua konten di JakSpot — mulai dari desain, logo, teks, foto, sampai kode — itu milik JakSpot atau pembuat konten masing-masing yang udah kasih izin.',
      'Lo gak boleh copy, modifikasi, distribusi, atau reproduksi konten kita tanpa izin tertulis. Kalau lo mau pake konten kita buat sesuatu, hubungi kita dulu.',
      'Brand "JakSpot", logo, dan semua elemen visual terkait dilindungi hukum. Jangan bikin yang mirip-mirip biar gak ribet.',
    ],
  },
  {
    title: 'Konten Pihak Ketiga',
    content: [
      'JakSpot kadang nampilin atau nge-link ke konten dari pihak ketiga — kayak website event, tempat makan, atau platform tiket. Soal itu:',
      '• Kita gak bertanggung jawab atas konten, akurasi, atau kebijakan dari website eksternal.',
      '• Link yang ada di JakSpot bukan berarti kita nge-endorse semua yang ada di sana.',
      '• Kalau lo transaksi di website pihak ketiga, itu urusan lo sama mereka ya. Kita cuma jembatan info.',
    ],
  },
  {
    title: 'Akurasi Informasi',
    content: [
      'Kita berusaha keras buat ngasih info yang akurat dan up-to-date. Tapi real talk — kadang ada aja yang berubah:',
      '• Tempat bisa tutup, pindah, atau ganti jam operasional tanpa notice.',
      '• Harga, menu, dan fasilitas bisa berubah sewaktu-waktu.',
      '• Info event bisa berubah dari penyelenggaranya langsung.',
      'Jadi, kita saranin lo buat double-check langsung ke tempat atau penyelenggara sebelum dateng. JakSpot gak bertanggung jawab kalau ada info yang udah gak valid.',
    ],
  },
  {
    title: 'Batasan Tanggung Jawab',
    content: [
      'JakSpot disediain "as is" — apa adanya. Kita gak kasih jaminan bahwa:',
      '• Website bakal selalu available 24/7 tanpa gangguan.',
      '• Semua info di sini 100% akurat setiap saat.',
      '• Website bebas dari bug atau error.',
      'Kita gak bertanggung jawab atas kerugian langsung atau gak langsung yang timbul dari penggunaan JakSpot. Termasuk tapi gak terbatas pada: kerugian finansial, kehilangan data, atau kekecewaan karena tempat nongkrongnya ternyata rame banget.',
    ],
  },
  {
    title: 'Newsletter & Komunikasi',
    content: [
      'Kalau lo subscribe newsletter kita:',
      '• Lo bakal terima email tentang spot baru, event seru, dan update dari JakSpot.',
      '• Kita gak bakal spam lo. Paling 1-2 email per minggu, max.',
      '• Lo bisa unsubscribe kapan aja lewat link di email. No hard feelings.',
      '• Email lo gak bakal kita jual atau kasih ke pihak ketiga.',
    ],
  },
  {
    title: 'Pemutusan Akses',
    content: [
      'Kita berhak buat nge-block atau batasi akses lo ke JakSpot kalau:',
      '• Lo ngelakuin hal-hal yang ngelanggar syarat & ketentuan ini.',
      '• Lo nyoba nge-hack, scrape, atau ganggu operasional website.',
      '• Lo pake JakSpot buat tujuan yang merugikan kita atau pengguna lain.',
      'Keputusan ini sepenuhnya di tangan kita dan gak perlu pemberitahuan sebelumnya.',
    ],
  },
  {
    title: 'Hukum yang Berlaku',
    content: [
      'Syarat & Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia.',
      'Kalau ada sengketa, kita coba selesaiin secara musyawarah dulu. Kalau gak bisa, baru kita bawa ke jalur hukum yang berlaku di wilayah DKI Jakarta.',
    ],
  },
  {
    title: 'Kontak',
    content: [
      'Ada pertanyaan soal syarat & ketentuan ini? Atau mau diskusi sebelum ngelakuin sesuatu yang lo gak yakin boleh atau enggak? Hit us up:',
      '• **Email:** info@jakspot.id',
      '• **Alamat:** Jl. Jakarta Pusat No. 123, DKI Jakarta, Indonesia',
      'Terakhir diperbarui: 1 Maret 2026.',
    ],
  },
];

function renderContent(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: 'var(--foreground)', fontWeight: 600 }}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function TermsPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('active'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar variant="subpage" />

      <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
        {/* ═══════ HERO ═══════ */}
        <section
          style={{
            position: 'relative',
            minHeight: '55vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            padding: '120px 5% 60px',
          }}
        >
          <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,193,7,0.08) 0%, transparent 70%)', bottom: '-80px', left: '-80px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
            <div className="reveal" style={{ marginBottom: '24px' }}>
              <span style={{ display: 'inline-block', padding: '8px 20px', borderRadius: '50px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, letterSpacing: '0.03em' }}>
                Legal
              </span>
            </div>

            <h1 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
              Syarat & <span className="gradient-text">Ketentuan</span>
            </h1>

            <p className="reveal" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '550px', margin: '0 auto' }}>
              Sebelum lo explore lebih jauh, baca dulu aturan mainnya. Tenang, gak ribet kok — kita jelasin pake bahasa manusia.
            </p>
          </div>
        </section>

        {/* ═══════ CONTENT ═══════ */}
        <section style={{ padding: '0 5% 100px', maxWidth: '900px', margin: '0 auto' }}>
          {sections.map((section, i) => (
            <div key={i} className="reveal" style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,107,53,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
                  {section.title}
                </h2>
              </div>
              <div style={{ paddingLeft: '52px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.content.map((line, j) => (
                  <p key={j} style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                    {renderContent(line)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer showNewsletter={false} />
    </>
  );
}
