"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "../../../components/Navbar";
import { getDestinationBySlug } from "../../../data/destinations";
import { useAuth } from "../../../context/AuthContext";

const Footer = dynamic(() => import("../../../components/Footer"), { ssr: true });

interface Review {
  id: string;
  userId: string;
  userName: string;
  destinationSlug: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const destination = getDestinationBySlug(slug);
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Edit state
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/reviews?slug=${slug}`)
      .then(r => r.json())
      .then(data => { setReviews(data.reviews || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { window.location.href = '/signin'; return; }
    setReviewError('');
    setReviewLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationSlug: slug, rating: reviewRating, comment: reviewComment }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews(prev => [data.review, ...prev]);
        setReviewComment('');
        setReviewRating(5);
      } else {
        setReviewError(data.error || 'Gagal kirim review.');
      }
    } catch { setReviewError('Koneksi error.'); }
    setReviewLoading(false);
  };

  const startEditReview = (rev: Review) => {
    setEditingReviewId(rev.id);
    setEditRating(rev.rating);
    setEditComment(rev.comment);
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditRating(5);
    setEditComment('');
  };

  const submitEditReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReviewId) return;
    setEditLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingReviewId, rating: editRating, comment: editComment }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews(prev => prev.map(r => r.id === editingReviewId ? data.review : r));
        cancelEdit();
      }
    } catch {}
    setEditLoading(false);
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Yakin mau hapus review ini?')) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== id));
      }
    } catch {}
  };

  // Compute average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  if (!destination) {
    return (
      <>
        <Navbar variant="subpage" />
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', padding: '40px 20px', textAlign: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>Destinasi gak ditemukan</h1>
            <a href="/destinations" className="btn-secondary" style={{ textDecoration: 'none' }}>Kembali ke Destinasi</a>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar variant="subpage" />

      <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
        {/* Hero banner */}
        <section style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
          <img src={destination.gallery[0]} alt={destination.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--background) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,0.3) 100%)' }} />
          <div style={{ position: 'absolute', bottom: '30px', left: 'clamp(20px, 5vw, 60px)', right: 'clamp(20px, 5vw, 60px)', zIndex: 2 }}>
            <a href={`/destinations/${slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, padding: '8px 16px', borderRadius: '50px', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px', transition: 'all 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Kembali ke {destination.name}
            </a>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
              Review untuk <span className="gradient-text">{destination.name}</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '40px 5% 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Stats bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', padding: '20px 24px', background: 'var(--dark-surface-2)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{avgRating}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Rating</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{reviews.length} review</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[5, 4, 3, 2, 1].map(star => {
                  const count = reviews.filter(r => r.rating === star).length;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>{star}⭐</span>
                      <div style={{ flex: 1, height: '6px', background: 'var(--dark-surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gradient-1)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Write review form */}
            <div style={{ background: 'var(--dark-surface-2)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
              {user ? (
                <form onSubmit={submitReview}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--gradient-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                      {user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tulis review lo</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setReviewRating(star)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', fontSize: '1.4rem', transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {star <= reviewRating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Ceritain pengalaman lo di sini..."
                    required
                    rows={4}
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid var(--dark-surface-3)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'}
                  />
                  {reviewError && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '8px' }}>{reviewError}</p>}
                  <button type="submit" disabled={reviewLoading} className="btn-primary" style={{ marginTop: '14px', padding: '10px 24px', fontSize: '0.85rem', fontWeight: 600, cursor: reviewLoading ? 'not-allowed' : 'pointer', opacity: reviewLoading ? 0.7 : 1 }}>
                    {reviewLoading ? 'Mengirim...' : 'Kirim Review'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>Login dulu buat nulis review 🔒</p>
                  <a href="/signin" style={{ display: 'inline-block', padding: '10px 24px', borderRadius: '12px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Login</a>
                </div>
              )}
            </div>

            {/* All Reviews */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Memuat review...</div>
            ) : reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--dark-surface-2)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📝</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Belum ada review. Jadilah yang pertama!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.map((rev) => (
                  <div key={rev.id} style={{ background: 'var(--dark-surface-2)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', transition: 'border-color 0.3s' }}>
                    {editingReviewId === rev.id ? (
                      <form onSubmit={submitEditReview}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>
                            {rev.userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rev.userName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mengedit review</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} type="button" onClick={() => setEditRating(star)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', fontSize: '1.2rem' }}>
                              {star <= editRating ? '⭐' : '☆'}
                            </button>
                          ))}
                        </div>
                        <textarea value={editComment} onChange={(e) => setEditComment(e.target.value)} required rows={3}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid var(--primary)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                        />
                        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                          <button type="submit" disabled={editLoading} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.8rem', fontWeight: 600, cursor: editLoading ? 'not-allowed' : 'pointer' }}>
                            {editLoading ? 'Menyimpan...' : 'Simpan'}
                          </button>
                          <button type="button" onClick={cancelEdit} style={{ padding: '8px 20px', fontSize: '0.8rem', fontWeight: 600, background: 'var(--dark-surface-3)', border: 'none', borderRadius: '10px', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            Batal
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: user && rev.userId === user.id ? 'var(--gradient-1)' : 'var(--dark-surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: user && rev.userId === user.id ? 'white' : 'var(--text-muted)' }}>
                            {rev.userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                              {rev.userName}
                              {user && rev.userId === user.id && (
                                <span style={{ marginLeft: '8px', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '50px', background: 'rgba(255,107,53,0.15)', color: 'var(--primary)' }}>Kamu</span>
                              )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '0.8rem' }}>{'⭐'.repeat(rev.rating)}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {new Date(rev.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          {user && rev.userId === user.id && (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => startEditReview(rev)} title="Edit" style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,53,0.15)'; e.currentTarget.style.color = 'var(--primary)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              </button>
                              <button onClick={() => deleteReview(rev.id)} title="Hapus" style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.15)'; e.currentTarget.style.color = '#ff3b30'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                              </button>
                            </div>
                          )}
                        </div>
                        <p style={{ color: 'var(--foreground)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                          {rev.comment}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer showNewsletter={false} />
    </>
  );
}
