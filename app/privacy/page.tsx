'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

const sections = [
  {
    title: 'Data Apa Aja yang Kita Kumpulin?',
    content: [
      'Tenang, kita bukan stalker. Data yang kita kumpulin itu cuma yang bener-bener perlu buat bikin pengalaman lo di JakSpot makin smooth:',
      '• **Email lo** — kalau lo subscribe newsletter kita, biar kita bisa kirimin info spot baru dan event seru.',
      '• **Data penggunaan** — kayak halaman mana yang sering lo buka, berapa lama lo di situ, dan fitur apa yang lo pake. Ini buat kita improve website biar makin oke.',
      '• **Cookies** — bukan yang bisa dimakan ya. Ini small files yang ngebantu website kita inget preferensi lo.',
      '• **Info perangkat** — tipe browser, OS, dan resolusi layar lo. Biar tampilan website-nya tetep cakep di device lo.',
    ],
  },
  {
    title: 'Buat Apa Data Lo Kita Pake?',
    content: [
      'Data yang kita kumpulin dipake buat hal-hal yang bener-bener berguna:',
      '• Ngirim newsletter dan update tentang spot dan event terbaru di Jakarta.',
      '• Nambahin dan nge-improve fitur-fitur di JakSpot biar makin user-friendly.',
      '• Nge-analyze traffic website biar kita tau konten apa yang paling lo suka.',
      '• Mastiin website jalan dengan baik dan nge-fix bug kalau ada masalah.',
      'Kita gak pernah jual data lo ke pihak ketiga. Titik. No debat.',
    ],
  },
  {
    title: 'Soal Cookies',
    content: [
      'JakSpot pake cookies buat beberapa hal:',
      '• **Cookies esensial** — biar website-nya bisa jalan dengan bener. Tanpa ini, some features mungkin gak work.',
      '• **Cookies analitik** — buat nge-track gimana lo interact sama website kita. Datanya anonim kok, jadi gak ada yang tau itu lo.',
      '• **Cookies preferensi** — biar kita bisa inget pilihan lo, misalnya filter destinasi yang terakhir lo pake.',
      'Lo bisa atur cookies di browser lo kapan aja. Tapi kalau lo matiin semua, bisa jadi ada fitur yang agak error.',
    ],
  },
  {
    title: 'Keamanan Data Lo',
    content: [
      'Kita serius soal keamanan. Data lo dilindungi pake langkah-langkah kayak gini:',
      '• Enkripsi SSL/TLS buat semua data yang ditransmisi.',
      '• Akses ke data lo dibatasi cuma buat tim yang emang butuh.',
      '• Kita rutin review sistem keamanan biar gak ada celah.',
      'Tapi jujur aja, gak ada sistem yang 100% aman di internet. Kita bakal berusaha semaksimal mungkin, tapi lo juga perlu jaga-jaga dari sisi lo ya.',
    ],
  },
  {
    title: 'Hak-Hak Lo',
    content: [
      'Sebagai pengguna JakSpot, lo punya hak-hak ini:',
      '• **Hak akses** — Lo bisa minta tau data apa aja yang kita simpen tentang lo.',
      '• **Hak hapus** — Mau data lo dihapus? Gas, tinggal hubungi kita.',
      '• **Hak koreksi** — Kalau ada data yang salah, lo bisa minta kita benerin.',
      '• **Hak opt-out** — Gak mau terima newsletter lagi? Tinggal klik unsubscribe di email, beres.',
      'Buat ngelakuin semua itu, tinggal email kita di info@jakspot.id. Kita proses paling lambat 14 hari kerja.',
    ],
  },
  {
    title: 'Link ke Website Lain',
    content: [
      'JakSpot kadang ada link ke website lain — misalnya link ke tiket event atau social media spot tertentu. Begitu lo klik dan keluar dari JakSpot, kebijakan privasi kita udah gak berlaku lagi ya.',
      'Jadi pastiin lo baca juga kebijakan privasi dari website yang lo kunjungi. Kita gak bertanggung jawab atas konten atau praktik privasi mereka.',
    ],
  },
  {
    title: 'Perubahan Kebijakan',
    content: [
      'Kebijakan privasi ini bisa berubah sewaktu-waktu. Kalau ada update yang signifikan, kita bakal kasih tau lewat website atau newsletter.',
      'Terakhir diperbarui: 1 Maret 2026.',
      'Kalau lo terus pake JakSpot setelah perubahan, berarti lo setuju sama kebijakan yang baru. Simple, kan?',
    ],
  },
  {
    title: 'Mau Tanya atau Komplain?',
    content: [
      'Kalau lo ada pertanyaan, kekhawatiran, atau mau komplain soal privasi, langsung aja hubungi kita:',
      '• **Email:** info@jakspot.id',
      '• **Alamat:** Jl. Jakarta Pusat No. 123, DKI Jakarta, Indonesia',
      'Kita open banget buat diskusi. Jangan ragu ya!',
    ],
  },
];

function renderContent(text: string) {
  // Simple markdown-like bold rendering
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: 'var(--foreground)', fontWeight: 600 }}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function PrivacyPage() {
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
              Kebijakan <span className="gradient-text">Privasi</span>
            </h1>

            <p className="reveal" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '550px', margin: '0 auto' }}>
              Data lo penting, dan kita serius nge-handle itu. Baca ini biar lo tau gimana kita jaga privasi lo.
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
