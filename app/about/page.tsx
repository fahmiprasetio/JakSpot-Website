'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

/* ───── team members ───── */
const team = [
  {
    name: 'Naufal Fahmi',
    role: 'Founder & Lead Developer',
    avatar: 'NF',
    bio: 'Yang ngedesain, ngoding, dan keliling Jakarta buat nyobain semua spot satu-satu. Yes, literally.',
  },
];

/* ───── values ───── */
const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    title: 'Lokal & Autentik',
    desc: 'Info di sini tuh dari pengalaman turun langsung ke lapangan ya, bukan hasil copas Google doang.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Niat Banget',
    desc: 'Tiap halaman, tiap pixel — kita bikin karena emang sayang banget sama kota ini. No cap.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Buat Semua',
    desc: 'Lo anak Jaksel, Jakut, atau baru pertama kali injek Jakarta — santai, kita siap bantu lo explore.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Anti Zonk',
    desc: 'Gak asal masukin tempat. Setiap spot udah lewat filter ketat, jadi lo gak bakal nyesel dateng.',
  },
];

/* ───── timeline ───── */
const timeline = [
  {
    year: '2026',
    title: 'JakSpot Lahir',
    desc: 'Capek nyari tempat nongkrong yang bener di Jakarta tapi infonya berantakan. Yasudah, bikin sendiri aja.',
  },
  {
    year: '2026',
    title: 'Spot Mulai Nambah',
    desc: 'Dari coffee shop hidden gem sampe rooftop bar yang rada exclusive — satu-satu kita datengin dan kurasi.',
  },
  {
    year: '2026',
    title: 'Event Masuk',
    desc: 'Biar lo gak FOMO, kita tambahin juga info event Jakarta — dari festival gede sampe acara komunitas.',
  },
  {
    year: 'Soon',
    title: 'Lebih Gila Lagi',
    desc: 'Review dari kalian, route planner, dan fitur komunitas. Intinya, explore Jakarta bakal makin gampang.',
  },
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar variant="subpage" />

      <main ref={sectionRef} style={{ background: 'var(--background)', minHeight: '100vh' }}>
        {/* ═══════════════ HERO ═══════════════ */}
        <section
          style={{
            position: 'relative',
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            padding: '120px 5% 80px',
          }}
        >
          {/* decorative blurs */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
              top: '-100px',
              right: '-100px',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,193,7,0.08) 0%, transparent 70%)',
              bottom: '-80px',
              left: '-80px',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
            <div className="reveal" style={{ marginBottom: '24px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  background: 'rgba(255,107,53,0.1)',
                  border: '1px solid rgba(255,107,53,0.2)',
                  fontSize: '0.85rem',
                  color: 'var(--primary)',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                }}
              >
                Tentang Kami
              </span>
            </div>

            <h1
              className="reveal"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '24px',
                letterSpacing: '-0.02em',
              }}
            >
              Kita bantu lo
              <br />
              <span className="gradient-text">explore Jakarta</span> tanpa ribet
            </h1>

            <p
              className="reveal"
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              JakSpot tuh semacam cheat code buat lo yang mau tau spot-spot paling worth it di Jakarta —
              dari coffee shop yang aesthetic parah sampe event yang bikin lo gak mau rebahan.
            </p>
          </div>
        </section>

        {/* ═══════════════ OUR STORY ═══════════════ */}
        <section style={{ padding: '100px 5%' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div
              className="reveal"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
                gap: '60px',
                alignItems: 'center',
              }}
            >
              {/* text */}
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: '50px',
                    background: 'rgba(255,107,53,0.1)',
                    border: '1px solid rgba(255,107,53,0.2)',
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: 500,
                    marginBottom: '20px',
                  }}
                >
                  Our Story
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: '20px',
                  }}
                >
                  Ceritanya tuh <span className="gradient-text">gini...</span>
                </h2>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                    fontSize: '1rem',
                    marginBottom: '16px',
                  }}
                >
                  Lo pasti pernah bingung mau hangout di mana di Jakarta, kan? Kota segede ini tapi info tempat-tempat
                  kerennya tuh berantakan — ribet nyarinya, gak update, kadang udah tutup pas lo dateng.
                </p>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                    fontSize: '1rem',
                    marginBottom: '16px',
                  }}
                >
                  Nah, JakSpot tuh lahir gara-gara males sama situasi itu. <strong style={{ color: 'var(--foreground)' }}>Kita pengen bikin satu tempat yang isinya
                  pure rekomendasi terbaik Jakarta.</strong> Spot nongkrong, event seru, hidden gems — semua dikumpulin di sini
                  dengan tampilan yang gak bosenin.
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
                  Seriusan, Jakarta tuh punya sisi keren yang banyak orang belum tau. Kita mau bantu lo nemu itu semua.
                </p>
              </div>

              {/* visual */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'var(--dark-surface-2)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '40px',
                  minHeight: '360px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* decorative circle */}
                <div
                  style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
                    top: '20%',
                    right: '10%',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'var(--gradient-1)',
                      borderRadius: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '3rem',
                      color: 'white',
                      boxShadow: '0 16px 48px rgba(255,107,53,0.35)',
                      margin: '0 auto 24px',
                    }}
                  >
                    J
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 700,
                    }}
                  >
                    Jak<span className="gradient-text">Spot</span>
                  </div>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      marginTop: '8px',
                    }}
                  >
                    Jelajahi Pesona Jakarta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ VALUES ═══════════════ */}
        <section
          style={{
            padding: '100px 5%',
            background: 'var(--dark-surface)',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  background: 'rgba(255,107,53,0.1)',
                  border: '1px solid rgba(255,107,53,0.2)',
                  fontSize: '0.8rem',
                  color: 'var(--primary)',
                  fontWeight: 500,
                  marginBottom: '20px',
                }}
              >
                Values
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Kenapa harus <span className="gradient-text">JakSpot</span>?
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                gap: '24px',
              }}
            >
              {values.map((v, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: 'var(--dark-surface-2)',
                    borderRadius: '20px',
                    padding: '32px 28px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.3s ease',
                    transitionDelay: `${i * 0.08}s`,
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: 'rgba(255,107,53,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      marginBottom: '20px',
                    }}
                  >
                    {v.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      marginBottom: '10px',
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ TIMELINE ═══════════════ */}
        <section style={{ padding: '100px 5%' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  background: 'rgba(255,107,53,0.1)',
                  border: '1px solid rgba(255,107,53,0.2)',
                  fontSize: '0.8rem',
                  color: 'var(--primary)',
                  fontWeight: 500,
                  marginBottom: '20px',
                }}
              >
                Timeline
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Gimana cerita <span className="gradient-text">JakSpot</span>
              </h2>
            </div>

            <div style={{ position: 'relative' }}>
              {/* vertical line */}
              <div
                style={{
                  position: 'absolute',
                  left: '24px',
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'linear-gradient(180deg, var(--primary) 0%, rgba(255,107,53,0.1) 100%)',
                }}
              />

              {timeline.map((item, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    display: 'flex',
                    gap: '28px',
                    marginBottom: i < timeline.length - 1 ? '40px' : 0,
                    position: 'relative',
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  {/* dot */}
                  <div
                    style={{
                      width: '50px',
                      minWidth: '50px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      paddingTop: '4px',
                    }}
                  >
                    <div
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: i === timeline.length - 1 ? 'var(--dark-surface-3)' : 'var(--primary)',
                        border: i === timeline.length - 1 ? '2px solid var(--primary)' : 'none',
                        boxShadow: i === timeline.length - 1 ? 'none' : '0 0 12px rgba(255,107,53,0.4)',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    />
                  </div>

                  {/* content */}
                  <div
                    style={{
                      background: 'var(--dark-surface-2)',
                      borderRadius: '16px',
                      padding: '24px 28px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      flex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--primary)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.year}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        margin: '6px 0 8px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ TEAM ═══════════════ */}
        <section
          style={{
            padding: '100px 5%',
            background: 'var(--dark-surface)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  background: 'rgba(255,107,53,0.1)',
                  border: '1px solid rgba(255,107,53,0.2)',
                  fontSize: '0.8rem',
                  color: 'var(--primary)',
                  fontWeight: 500,
                  marginBottom: '20px',
                }}
              >
                Tim
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Siapa nih di balik <span className="gradient-text">JakSpot</span>?
              </h2>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '32px',
                flexWrap: 'wrap',
              }}
            >
              {team.map((member, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: 'var(--dark-surface-2)',
                    borderRadius: '20px',
                    padding: '40px 32px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textAlign: 'center',
                    width: '300px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'var(--gradient-1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      color: 'white',
                      margin: '0 auto 20px',
                      boxShadow: '0 8px 28px rgba(255,107,53,0.3)',
                    }}
                  >
                    {member.avatar}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    style={{
                      color: 'var(--primary)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      marginBottom: '14px',
                    }}
                  >
                    {member.role}
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ CTA ═══════════════ */}
        <section style={{ padding: '100px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* decorative */}
          <div
            style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />

          <div className="reveal" style={{ position: 'relative', zIndex: 2 }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              Udah siap explore <span className="gradient-text">Jakarta</span>?
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                maxWidth: '500px',
                margin: '0 auto 36px',
              }}
            >
              Dari spot nongkrong yang anti-mainstream sampe event yang bakal bikin feed lo rame — tinggal klik doang.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/destinations" className="btn-primary" style={{ textDecoration: 'none' }}>
                Gas ke Destinasi
              </a>
              <a href="/event" className="btn-secondary" style={{ textDecoration: 'none' }}>
                Cek Event
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer showNewsletter={false} />
    </>
  );
}
