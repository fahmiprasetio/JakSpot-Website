'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

interface Destination {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  description: string;
  hoverImage?: string;
}

const allDestinations: Destination[] = [
  // === KOPI ===
  {
    id: 1,
    name: 'Tugo Coffee',
    category: 'Kopi',
    location: 'Jakarta',
    image: '/Destination/Cafe, Bar, and Eatery/Tugo Coffee.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Tugo Coffee 2.jpg',
    description: 'Single origin yang dikerjain serius, buat lo yang udah beyond kopi sachet',
  },
  {
    id: 2,
    name: 'Kurasu Kissaten',
    category: 'Kopi',
    location: 'Senopati',
    image: '/Destination/Cafe, Bar, and Eatery/Kurasu.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Kurasu 2.jpg',
    description: 'Straight from Kyoto. Precision coffee yang bikin lo ngerti kenapa orang rela bayar mahal',
  },
  {
    id: 3,
    name: 'Masagi Coffee',
    category: 'Kopi',
    location: 'BSD',
    image: '/Destination/Cafe, Bar, and Eatery/Masagi Coffee.webp',
    description: 'Ngopi di tengah taman, gak ada drama, chill total',
  },
  {
    id: 4,
    name: 'Toko Kopi Maru',
    category: 'Kopi',
    location: 'Fatmawati',
    image: '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru 2.jpeg',
    description: 'Gula aren, susu, kopi. Formula sederhana yang bikin lo balik lagi dan lagi',
  },
  {
    id: 5,
    name: 'Dudung Maman Kopi',
    category: 'Kopi',
    location: 'Jakarta',
    image: '/Destination/Cafe, Bar, and Eatery/Dudung Maman Kopi.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Dudung Maman Kopi 2.jpg',
    description: 'Harga warung tapi kualitasnya specialty. Temuan terbaik yang lo mau flex ke temen',
  },
  {
    id: 6,
    name: 'Kopi Kalyan',
    category: 'Kopi',
    location: 'Cikajang',
    image: '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan 2.jpeg',
    description: 'Luas, adem, WiFi lancar. Surga buat lo yang kerja remote tapi butuh suasana baru',
  },
  {
    id: 7,
    name: 'Ngoepi',
    category: 'Kopi',
    location: 'Jakarta',
    image: '/Destination/Cafe, Bar, and Eatery/Ngoepi.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Ngoepi 2.jpg',
    description: 'Santai, murah, dan enak. Trifecta langka yang jarang banget lo temuin sekaligus',
  },

  // === CAFE ===
  {
    id: 8,
    name: 'HOMS Jakarta',
    category: 'Cafe',
    location: 'Jakarta',
    image: '/Destination/Cafe, Bar, and Eatery/HOMS.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/HOMS 2.jpg',
    description: 'Vibes rumah orang kaya yang cozy banget, WiFi-nya kenceng, cocok WFC seharian',
  },
  {
    id: 9,
    name: 'Smiljan Makarya',
    category: 'Cafe',
    location: 'Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 2.jpeg',
    description: 'Gallery-cafe fusion yang vibe-nya benar-benar beda dari tempat ngopi biasa',
  },
  {
    id: 10,
    name: 'Row 9 Cafe',
    category: 'Cafe',
    location: 'Blok M',
    image: '/Destination/Cafe, Bar, and Eatery/row9.jpg',
    description: 'Outdoor vibes di Blok M, cocok banget buat sore-sorean sambil nunggu macet kelar',
  },
  {
    id: 11,
    name: 'Salty Salty PIK',
    category: 'Cafe',
    location: 'PIK',
    image: '/Destination/Cafe, Bar, and Eatery/Salty Salty.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Salty Salty 2.jpg',
    description: 'Brunch yang instagramable parah tapi rasanya beneran enak, bukan cuma cantik doang',
  },
  {
    id: 12,
    name: 'Sarang Semut',
    category: 'Cafe',
    location: 'Cikini',
    image: '/Destination/Cafe, Bar, and Eatery/sarang-semut.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/sarang-semut2.jpg',
    description: 'Interior gua batu yang literally unik parah, setiap sudut foto lo bakal auto keren',
  },

  // === BAR ===
  {
    id: 13,
    name: 'The Platform Bar',
    category: 'Bar',
    location: 'Jakarta',
    image: '/Destination/Cafe, Bar, and Eatery/The Platform Jakarta.webp',
    description: 'Cocktail sambil ngeliatin Bundaran HI dari atas? Serius, ini nyata dan lo bisa',
  },
  {
    id: 14,
    name: 'St. Regis Bar',
    category: 'Bar',
    location: 'Kuningan',
    image: '/Destination/Cafe, Bar, and Eatery/St Regis Jakarta Bar.jpg',
    description: 'Jazz live, cocktail premium, WiFi kenceng. New York vibe tapi koordinatnya Kuningan',
  },
  {
    id: 15,
    name: 'Costess Bar',
    category: 'Bar',
    location: 'Kuningan',
    image: '/Destination/Cafe, Bar, and Eatery/Costess Cafe Jakarta.jpg',
    description: 'View gedung kaca Kuningan dari atas sambil pegang cocktail. Gak ada yang lebih Jakarta dari ini',
  },
  {
    id: 16,
    name: "Billy's Block",
    category: 'Bar',
    location: 'Jakarta',
    image: "/Destination/Cafe, Bar, and Eatery/Billy's Block.jpeg",
    hoverImage: "/Destination/Cafe, Bar, and Eatery/Billy's Block 2.jpeg",
    description: 'Live music, crowd asik, vibes naik terus tiap malam. Weekend lo harus di sini',
  },
  {
    id: 17,
    name: 'Bossanova',
    category: 'Bar',
    location: 'Jakarta',
    image: '/Destination/Cafe, Bar, and Eatery/Bossanova.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Bossanova 2.jpeg',
    description: 'Retro yang gak dipaksain, malah bikin lo pengen duduk lama-lama dan gak mau pulang',
  },
  {
    id: 18,
    name: 'Tsuki at the Alley',
    category: 'Bar',
    location: 'Kemang',
    image: '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley 2.jpg',
    description: 'Gang tersembunyi dengan nuansa malam Tokyo. Lo harus nemu sendiri buat ngerasainnya',
  },

  // === RESTO ===
  {
    id: 19,
    name: 'Waroeng Roekoen',
    category: 'Resto',
    location: 'Jakarta',
    image: '/Destination/Cafe, Bar, and Eatery/waroeng roekoen.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/waroeng roekoen 2.jpg',
    description: 'Masakan rumahan yang bikin lo makan banyak tanpa drama dan tanpa kantong jebol',
  },
  {
    id: 20,
    name: 'The Cafe Hotel Mulia',
    category: 'Resto',
    location: 'Senayan',
    image: '/Destination/Cafe, Bar, and Eatery/The Cafe Hotel Mulia.jpg',
    description: 'Fine dining level dewa di jantung Senayan. Kalau mau impress seseorang, ini tempatnya',
  },
  {
    id: 21,
    name: 'RM. Fariz',
    category: 'Resto',
    location: 'Jakarta',
    image: '/Destination/Cafe, Bar, and Eatery/RM Fariz.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/RM Fariz 2.jpeg',
    description: 'Cita rasa nusantara yang jujur dan familiar, harga yang gak bikin lo overthinking',
  },

  // === BUDAYA ===
  {
    id: 22,
    name: 'Chandra Naya',
    category: 'Budaya',
    location: 'Glodok',
    image: '/Destination/Chandra Naya.jpg',
    hoverImage: '/Destination/Chandra Naya 2.jpg',
    description: 'Bangunan bersejarah dengan arsitektur Tionghoa yang otentik di jantung Glodok',
  },
];

const filters = ['Semua', 'Kopi', 'Cafe', 'Bar', 'Resto', 'Budaya'];

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reveal animation — re-observe when filter changes so new cards animate in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Brief delay so React has rendered the new card elements
    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 10);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [activeFilter]);

  const filteredDestinations =
    activeFilter === 'Semua'
      ? allDestinations
      : allDestinations.filter((d) => d.category === activeFilter);

  return (
    <>
      <Navbar variant="subpage" />

      <main>
        {/* ====== HERO SECTION ====== */}
        <section
          style={{
            position: 'relative',
            height: '55vh',
            minHeight: '400px',
            overflow: 'hidden',
          }}
        >
          {/* Bridge Upscale Background */}
          <img
            src="/Bridge Upscale.png"
            alt="Jakarta Skyline"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 70%',
            }}
          />

          {/* Gradient Overlay — dark at bottom, transparent at top */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, var(--dark-surface) 0%, rgba(10,10,15,0.5) 40%, rgba(10,10,15,0.2) 70%, transparent 100%)',
            }}
          />

          {/* Hero Content */}
          <div
            className="reveal"
            style={{
              position: 'absolute',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 2,
              width: '90%',
              maxWidth: '600px',
            }}
          >
            <span
              style={{
                color: 'var(--primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              Eksplor Jakarta
            </span>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: 'var(--foreground)',
                marginTop: '12px',
                lineHeight: 1.1,
              }}
            >
              Semua <span className="gradient-text">Destinasi</span>
            </h1>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                maxWidth: '500px',
                margin: '16px auto 0',
                lineHeight: 1.7,
              }}
            >
              Dari coffee shop tersembunyi sampai rooftop bar paling keren.
              Semua ada di sini.
            </p>
          </div>
        </section>

        {/* ====== DESTINATIONS CONTENT ====== */}
        <section
          ref={contentRef}
          style={{
            background: 'var(--dark-surface)',
            padding: '60px 5% 100px',
            position: 'relative',
          }}
        >
          {/* Background Decoration */}
          <div
            style={{
              position: 'absolute',
              top: '200px',
              right: '-200px',
              width: '600px',
              height: '600px',
              background:
                'radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '300px',
              left: '-200px',
              width: '500px',
              height: '500px',
              background:
                'radial-gradient(circle, rgba(255, 193, 7, 0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Filter Tabs */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '50px',
                  border: 'none',
                  background:
                    activeFilter === filter
                      ? 'var(--gradient-1)'
                      : 'var(--dark-surface-2)',
                  color:
                    activeFilter === filter ? 'white' : 'var(--text-muted)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Result Count */}
          <div
            className="reveal"
            style={{
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
              }}
            >
              Menampilkan{' '}
              <strong style={{ color: 'var(--primary)' }}>
                {filteredDestinations.length}
              </strong>{' '}
              destinasi
            </span>
          </div>

          {/* Destinations Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '30px',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className="card destination-card reveal"
                style={{
                  position: 'relative',
                  height: '450px',
                  cursor: 'pointer',
                  transitionDelay: `${(index % 6) * 0.1}s`,
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
                onMouseEnter={() => setHoveredCard(destination.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Wrapper */}
                <div
                  className="media-wrapper"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    borderRadius: '16px',
                  }}
                >
                  {/* Hover Image Layer (Background) */}
                  {destination.hoverImage && (
                    <img
                      src={destination.hoverImage}
                      alt={destination.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Main Image Layer (Foreground with Wipe Animation) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 2,
                      transition:
                        'clip-path 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      clipPath:
                        hoveredCard === destination.id &&
                        destination.hoverImage
                          ? 'inset(0 0 0 100%)'
                          : 'inset(0 0 0 0%)',
                    }}
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  {/* Wipe Line */}
                  {destination.hoverImage && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        width: '3px',
                        background:
                          'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 30%, white 50%, rgba(255,255,255,0.9) 70%, transparent 100%)',
                        boxShadow: '0 0 12px 3px rgba(255,255,255,0.7)',
                        zIndex: 3,
                        pointerEvents: 'none',
                        transition:
                          'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s ease',
                        left:
                          hoveredCard === destination.id
                            ? 'calc(100% + 3px)'
                            : '0px',
                        opacity: hoveredCard === destination.id ? 1 : 0,
                      }}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 80%)',
                      zIndex: 4,
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Category Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    className="glass"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      color: 'white',
                    }}
                  >
                    {destination.category}
                  </span>
                </div>

                {/* Location Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    className="glass"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {destination.location}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="content-wrapper"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '30px',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      marginBottom: '8px',
                      color: 'white',
                    }}
                  >
                    {destination.name}
                  </h3>
                  <p
                    style={{
                      color: 'white',
                      fontSize: '0.95rem',
                    }}
                  >
                    {destination.description}
                  </p>

                  {/* Explore Button */}
                  <div
                    className="explore-btn"
                    style={{
                      marginTop: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--primary)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span>Jelajahi</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDestinations.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: 'var(--text-muted)',
              }}
            >
              <p style={{ fontSize: '1.1rem' }}>
                Belum ada destinasi untuk kategori ini.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Page-specific responsive styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @media (max-width: 768px) {
          .destination-card {
            height: 350px !important;
          }
        }
      `}</style>
    </>
  );
}
