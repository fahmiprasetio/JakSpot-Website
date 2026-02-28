"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import allDestinations from "../data/destinations";

const Footer = dynamic(() => import("../components/Footer"), { ssr: true });

const filters = ["Semua", "Kopi", "Cafe", "Bar", "Resto", "Budaya"];
const ITEMS_PER_PAGE = 9;

// --------------- Card sub-component ---------------
interface DestinationCardProps {
  destination: (typeof allDestinations)[number];
  index: number;
}

function DestinationCard({ destination, index }: DestinationCardProps) {
  const [hovered, setHovered] = useState(false);
  const [loadCount, setLoadCount] = useState(0);
  const totalImages = destination.hoverImage ? 2 : 1;
  const imagesReady = loadCount >= totalImages;
  const handleLoad = () => setLoadCount((c) => c + 1);

  return (
    <a
      href={`/destinations/${destination.slug}`}
      className="card destination-card reveal"
      style={{
        position: "relative",
        height: "450px",
        cursor: "pointer",
        transitionDelay: `${(index % 6) * 0.1}s`,
        overflow: "hidden",
        borderRadius: "16px",
        textDecoration: "none",
        display: "block",
        background: "var(--dark-surface-2)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Wrapper — hidden until both images are loaded */}
      <div
        className="media-wrapper"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: "16px",
          opacity: imagesReady ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {/* Hover Image Layer (Background) */}
        {destination.hoverImage && (
          <img
            src={destination.hoverImage}
            alt={destination.name}
            loading="lazy"
            decoding="async"
            onLoad={handleLoad}
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
              hovered && destination.hoverImage
                ? "inset(0 0 0 100%)"
                : "inset(0 0 0 0%)",
          }}
        >
          <img
            src={destination.image}
            alt={destination.name}
            loading="lazy"
            decoding="async"
            onLoad={handleLoad}
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
              left: hovered ? "calc(100% + 3px)" : "0px",
              opacity: hovered ? 1 : 0,
            }}
          />
        )}

        {/* Gradient Overlay */}
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

      {/* Location Badge */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span
          className="glass"
          style={{
            padding: "8px 14px",
            borderRadius: "50px",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
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
            fontWeight: 700,
            marginBottom: "8px",
            color: "white",
          }}
        >
          {destination.name}
        </h3>
        <p style={{ color: "white", fontSize: "0.95rem" }}>
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
            fontWeight: 600,
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
    </a>
  );
}
// ---------------------------------------------------

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reveal animation — re-observe when filter or page changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("active");
      });
    }, 10);
    return () => clearTimeout(timeout);
  }, [activeFilter, currentPage]);

  const filteredDestinations =
    activeFilter === "Semua"
      ? allDestinations
      : allDestinations.filter((d) => d.category === activeFilter);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar variant="subpage" />

      <main style={{ position: "relative" }}>
        {/* ====== HERO — fixed, never moves ====== */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "68vh",
            minHeight: "460px",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {/* Bridge Upscale Background */}
          <img
            src="/Bridge Upscale.png"
            alt="Jakarta Skyline"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 125%",
            }}
          />

          {/* Gradient Overlay — smooth fade into section 2 colour */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(18,18,26,0.2) 0%, rgba(18,18,26,0.0) 30%, rgba(18,18,26,0.0) 40%, rgba(18,18,26,0.4) 60%, rgba(18,18,26,0.8) 80%, #12121a 100%)",
            }}
          />
        </div>

        {/* Spacer so content starts below the hero (minus overlap) */}
        <div style={{ height: "calc(68vh - 160px)", minHeight: "300px" }} />

        {/* ====== DESTINATIONS CONTENT — scrolls over fixed hero ====== */}
        <section
          ref={contentRef}
          style={{
            background: "var(--dark-surface)",
            padding: "60px 5% 100px",
            position: "relative",
            zIndex: 1,
            borderRadius: "32px 32px 0 0",
            boxShadow: "0 -32px 80px rgba(18,18,26,1)",
          }}
        >
          {/* Hero Text — sits at top of content, above filter tabs */}
          <div
            className="reveal"
            style={{
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--foreground)",
                marginTop: "12px",
                lineHeight: 1.1,
              }}
            >
              Destinasi yang <span className="gradient-text">Gak Pasaran</span>
            </h1>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                maxWidth: "500px",
                margin: "16px auto 0",
                lineHeight: 1.7,
              }}
            >
              Dari coffee shop tersembunyi sampe rooftop bar paling keren.
              Hidden gems Jakarta yang belum lo kenal — yuk eksplor semuanya.
            </p>
          </div>
          {/* Background Decoration */}
          <div
            style={{
              position: "absolute",
              top: "200px",
              right: "-200px",
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "300px",
              left: "-200px",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(255, 193, 7, 0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Filter Tabs */}
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "50px",
                  border: "none",
                  background:
                    activeFilter === filter
                      ? "var(--gradient-1)"
                      : "var(--dark-surface-2)",
                  color:
                    activeFilter === filter ? "white" : "var(--text-muted)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
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
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
              }}
            >
              Menampilkan{" "}
              <strong style={{ color: "var(--primary)" }}>
                {filteredDestinations.length}
              </strong>{" "}
              destinasi &nbsp;·&nbsp; Halaman{" "}
              <strong style={{ color: "var(--primary)" }}>{currentPage}</strong>{" "}
              dari{" "}
              <strong style={{ color: "var(--primary)" }}>
                {totalPages || 1}
              </strong>
            </span>
          </div>

          {/* Destinations Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "30px",
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            {paginatedDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredDestinations.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                color: "var(--text-muted)",
              }}
            >
              <p style={{ fontSize: "1.1rem" }}>
                Belum ada destinasi untuk kategori ini.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginTop: "60px",
                flexWrap: "wrap",
              }}
            >
              {/* Prev */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "none",
                  background:
                    currentPage === 1
                      ? "var(--dark-surface-2)"
                      : "var(--dark-surface-3)",
                  color:
                    currentPage === 1
                      ? "var(--text-muted)"
                      : "var(--foreground)",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  opacity: currentPage === 1 ? 0.4 : 1,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  const isActive = page === currentPage;
                  const isNear =
                    Math.abs(page - currentPage) <= 1 ||
                    page === 1 ||
                    page === totalPages;
                  if (!isNear) {
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span
                          key={page}
                          style={{
                            color: "var(--text-muted)",
                            padding: "0 4px",
                          }}
                        >
                          …
                        </span>
                      );
                    }
                    return null;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "none",
                        background: isActive
                          ? "var(--gradient-1)"
                          : "var(--dark-surface-2)",
                        color: isActive ? "white" : "var(--text-muted)",
                        fontWeight: isActive ? 700 : 400,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {page}
                    </button>
                  );
                },
              )}

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "none",
                  background:
                    currentPage === totalPages
                      ? "var(--dark-surface-2)"
                      : "var(--dark-surface-3)",
                  color:
                    currentPage === totalPages
                      ? "var(--text-muted)"
                      : "var(--foreground)",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  opacity: currentPage === totalPages ? 0.4 : 1,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer showNewsletter={false} />

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
