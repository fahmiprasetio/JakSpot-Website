"use client";

import { useEffect, useRef, useState } from "react";

interface Destination {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  hoverImage?: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Sarang Semut",
    category: "Arts",
    image: "/Destination/Cafe, Bar, and Eatery/sarang-semut.jpg",
    description: "Vibes gua aesthetic di Cikini yang teksturnya unik parah",
    hoverImage: "/Destination/Cafe, Bar, and Eatery/sarang-semut2.jpg",
  },
  {
    id: 2,
    name: "Smiljan Makarya",
    category: "Arts",
    image: "/Destination/Cafe, Bar, and Eatery/Smiljan Makarya.jpeg",
    description:
      "Gallery-cafe fusion di Jakarta Selatan yang vibe-nya benar-benar beda",
    hoverImage: "/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 2.jpeg",
  },
  {
    id: 3,
    name: "Tsuki at the Alley",
    category: "Chill",
    image: "/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley.jpg",
    description: "Gang tersembunyi di Kemang yang punya nuansa malam Tokyo",
    hoverImage: "/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley 2.jpg",
  },
  {
    id: 4,
    name: "Salty Salty",
    category: "Skyline",
    image: "/Destination/Cafe, Bar, and Eatery/Salty Salty.jpg",
    description: "Rooftop di Menteng yang golden hour-nya gak ada obat",
    hoverImage: "/Destination/Cafe, Bar, and Eatery/Salty Salty 2.jpg",
  },
  {
    id: 5,
    name: "Toko Kopi Maru",
    category: "Chill",
    image: "/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru.jpeg",
    description: "Hidden gem di Pasar Baru dengan suasana vintage yang calming",
    hoverImage: "/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru 2.jpeg",
  },
  {
    id: 6,
    name: "Chandra Naya",
    category: "Culture",
    image: "/Destination/Chandra Naya.jpg",
    description: "Bangunan bersejarah dengan arsitektur Tionghoa yang otentik",
    hoverImage: "/Destination/Chandra Naya 2.jpg",
  },
];

const DestinationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const filters = [
    "Semua",
    "Skyline",
    "Arsitektur",
    "Chill",
    "Arts",
    "Culture",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    const revealElements = sectionRef.current?.querySelectorAll(".reveal");
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredDestinations = (
    activeFilter === "Semua"
      ? destinations
      : destinations.filter((d) => d.category === activeFilter)
  ).slice(0, 6);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="section"
      style={{
        background: "var(--dark-surface)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decoration */}
      <div
        style={{
          position: "absolute",
          top: "100px",
          right: "-200px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section Header */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span
            style={{
              color: "var(--primary)",
              fontSize: "0.9rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Bukan yang Itu-Itu Aja
          </span>
          <h2 className="section-title" style={{ marginTop: "16px" }}>
            Spot yang Jarang
            <br />
            <span className="gradient-text">Orang Tau</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Lo gak perlu jauh-jauh ke Bali buat nemu tempat keren. Jakarta punya
            hidden gems yang lo pasti belum eksplor.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "50px",
            flexWrap: "wrap",
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: "10px 24px",
                borderRadius: "50px",
                border: "none",
                background:
                  activeFilter === filter
                    ? "var(--gradient-1)"
                    : "var(--dark-surface-2)",
                color: activeFilter === filter ? "white" : "var(--text-muted)",
                fontSize: "0.9rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
          }}
        >
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="card destination-card reveal"
              style={{
                position: "relative",
                height: "450px",
                cursor: "pointer",
                transitionDelay: `${index * 0.1}s`,
                overflow: "hidden",
                borderRadius: "16px",
              }}
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Wrapper */}
              <div
                className="media-wrapper"
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  borderRadius: "16px",
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
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Main Image Layer (Foreground with Wipe Animation) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    transition: "clip-path 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    clipPath:
                      hoveredCard === destination.id && destination.hoverImage
                        ? "inset(0 0 0 100%)"
                        : "inset(0 0 0 0%)",
                  }}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Wipe Line */}
                {destination.hoverImage && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      width: "3px",
                      background:
                        "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 30%, white 50%, rgba(255,255,255,0.9) 70%, transparent 100%)",
                      boxShadow: "0 0 12px 3px rgba(255,255,255,0.7)",
                      zIndex: 3,
                      pointerEvents: "none",
                      transition:
                        "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s ease",
                      left:
                        hoveredCard === destination.id
                          ? "calc(100% + 3px)"
                          : "0px",
                      opacity: hoveredCard === destination.id ? 1 : 0,
                    }}
                  />
                )}

                {/* Gradient Overlay (Always Visible) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 80%)",
                    zIndex: 4,
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Category Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <span
                  className="glass"
                  style={{
                    padding: "8px 16px",
                    borderRadius: "50px",
                    fontSize: "0.8rem",
                    color: "white",
                  }}
                >
                  {destination.category}
                </span>
              </div>

              {/* Content */}
              <div
                className="content-wrapper"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "30px",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    marginBottom: "8px",
                    color: "white",
                  }}
                >
                  {destination.name}
                </h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                >
                  {destination.description}
                </p>

                {/* Explore Button */}
                <div
                  className="explore-btn"
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--primary)",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
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

        {/* View All Button */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginTop: "60px" }}
        >
          <a
            href="/destinations"
            className="btn-secondary"
            style={{ textDecoration: "none" }}
          >
            Lihat Semua Destinasi
          </a>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
