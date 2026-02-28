'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

const faqs = [
  {
    category: 'Umum',
    items: [
      {
        q: 'JakSpot itu apaan sih?',
        a: 'JakSpot tuh platform digital yang bantu lo nemuin spot-spot paling worth it di Jakarta — mulai dari coffee shop hidden gem, rooftop bar, tempat kuliner, sampe event-event seru. Intinya, biar lo gak perlu scroll Instagram sampe pegel cuma buat cari tempat nongkrong.',
      },
      {
        q: 'Ini gratis atau bayar?',
        a: 'Full gratis, bro! Lo bisa akses semua info destinasi, event, dan konten di JakSpot tanpa bayar sepeser pun. Kita pengen semua orang bisa explore Jakarta tanpa hambatan.',
      },
      {
        q: 'Siapa sih di balik JakSpot?',
        a: 'JakSpot dibikin sama anak-anak Jakarta yang emang passionate banget sama kota ini. Kita turun langsung ke lapangan buat nyobain dan kurasi setiap spot yang lo liat di sini. Jadi bukan asal copas dari Google, ya!',
      },
      {
        q: 'JakSpot cuma buat orang Jakarta doang?',
        a: 'Enggak dong! Lo mau anak Jaksel, Jakut, Bekasi, Depok, atau bahkan turis dari luar kota — semua boleh pake. Justru kalau lo baru pertama ke Jakarta, JakSpot bakal jadi bestie lo.',
      },
    ],
  },
  {
    category: 'Destinasi & Event',
    items: [
      {
        q: 'Gimana cara nemuin destinasi di JakSpot?',
        a: 'Gampang banget! Tinggal buka halaman Destinasi, trus filter sesuai kategori yang lo mau — Kopi, Cafe, Bar, Resto, atau Budaya. Mau yang mana aja, tinggal klik.',
      },
      {
        q: 'Info event-nya update gak?',
        a: 'Kita usahain selalu update, bray. Setiap ada event baru di Jakarta, tim kita langsung cek dan masukin. Tapi kalau lo nemu event yang belum ada, boleh banget kabarin kita lewat halaman Kontak!',
      },
      {
        q: 'Bisa booking atau beli tiket langsung di JakSpot?',
        a: 'Untuk saat ini, JakSpot fokus jadi platform informasi. Buat booking atau beli tiket, kita arahin lo ke link resmi penyelenggaranya. Tapi siapa tau nanti bisa langsung di sini — stay tuned!',
      },
      {
        q: 'Gimana kalau info spot atau event-nya udah gak valid?',
        a: 'Waduh, maaf banget kalau itu kejadian. Lo bisa langsung hubungi kita lewat halaman Kontak atau email ke info@jakspot.id, nanti kita update ASAP. Makasih udah bantu kita jadi lebih akurat!',
      },
    ],
  },
  {
    category: 'Teknis',
    items: [
      {
        q: 'Perlu bikin akun gak?',
        a: 'Nggak perlu! Lo bisa langsung browsing semua konten tanpa register. Gak ribet, gak pake drama.',
      },
      {
        q: 'Website-nya bisa dibuka di HP kan?',
        a: 'Bisa banget! JakSpot udah responsive, jadi mau buka di HP, tablet, atau laptop — tampilannya tetep cakep dan gampang dipake.',
      },
      {
        q: 'Kenapa website-nya agak lambat di HP gue?',
        a: 'Coba cek koneksi internet lo dulu, bray. JakSpot pake gambar berkualitas tinggi biar tampil kece, jadi emang butuh koneksi yang stabil. Kalau masih lemot, coba clear cache browser-nya.',
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: 'var(--dark-surface-2)',
        borderRadius: '16px',
        border: open ? '1px solid rgba(255,107,53,0.3)' : '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: open ? 'var(--primary)' : 'var(--foreground)',
          fontSize: '1.05rem',
          fontWeight: 600,
          fontFamily: 'var(--font-sans)',
          transition: 'color 0.3s ease',
        }}
      >
        <span>{q}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: open ? '500px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, padding 0.3s ease',
          padding: open ? '0 28px 24px' : '0 28px 0',
        }}
      >
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
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
          {/* decorative blurs */}
          <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,193,7,0.08) 0%, transparent 70%)', bottom: '-80px', left: '-80px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
            <div className="reveal" style={{ marginBottom: '24px' }}>
              <span style={{ display: 'inline-block', padding: '8px 20px', borderRadius: '50px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 500, letterSpacing: '0.03em' }}>
                FAQ
              </span>
            </div>

            <h1 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
              Ada <span className="gradient-text">Pertanyaan?</span>
            </h1>

            <p className="reveal" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '550px', margin: '0 auto' }}>
              Sebelum lo tanya-tanya, coba cek dulu di sini — siapa tau jawabannya udah ada. Kalau belum ketemu, gas aja hubungi kita!
            </p>
          </div>
        </section>

        {/* ═══════ FAQ CONTENT ═══════ */}
        <section style={{ padding: '0 5% 100px', maxWidth: '900px', margin: '0 auto' }}>
          {faqs.map((group, gi) => (
            <div key={gi} className="reveal" style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '4px', height: '28px', borderRadius: '2px', background: 'var(--gradient-1)' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>
                  {group.category}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.items.map((item, i) => (
                  <AccordionItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="reveal" style={{ textAlign: 'center', padding: '60px 0 0' }}>
            <div style={{ background: 'var(--dark-surface-2)', borderRadius: '24px', padding: '48px 32px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>
                Masih bingung?
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' }}>
                Gak nemu jawaban yang lo cari? Langsung aja reach out ke tim kita, kita fast response kok (biasanya).
              </p>
              <a
                href="/#contact"
                className="btn-primary"
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer showNewsletter={false} />
    </>
  );
}
