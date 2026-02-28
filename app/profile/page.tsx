'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import allDestinations from '../data/destinations';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, logout, updateProfile } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/signin');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || '');
    }
  }, [user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [editing]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setMessage('');

    const updateData: { name?: string; bio?: string; password?: string } = {};
    if (name !== user?.name) updateData.name = name;
    if (bio !== (user?.bio || '')) updateData.bio = bio;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      setEditing(false);
      setSaving(false);
      return;
    }

    const result = await updateProfile(updateData);
    setSaving(false);

    if (result.success) {
      setMessage('Profil berhasil diupdate!');
      setEditing(false);
      setPassword('');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setError(result.error || 'Gagal update profil.');
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading || !user) {
    return (
      <>
        <Navbar variant="subpage" />
        <main style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading...</div>
        </main>
      </>
    );
  }

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    : '-';

  const favoriteDestinations = allDestinations.filter((d) => favorites.includes(d.slug));

  return (
    <>
      <Navbar variant="subpage" />

      <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
        {/* ═══════ HERO ═══════ */}
        <section
          style={{
            position: 'relative',
            minHeight: '45vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            padding: '120px 5% 80px',
          }}
        >
          <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,193,7,0.06) 0%, transparent 70%)', bottom: '-80px', left: '-80px', pointerEvents: 'none' }} />

          <div className="reveal" style={{ position: 'relative', zIndex: 2 }}>
            {/* Avatar */}
            <div style={{
              width: '100px', height: '100px', borderRadius: '28px',
              background: 'var(--gradient-1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.2rem', fontWeight: 800, color: 'white',
              margin: '0 auto 20px',
              boxShadow: '0 12px 40px rgba(255,107,53,0.3)',
            }}>
              {initials}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '8px' }}>
              {user.name}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{user.email}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px', opacity: 0.7 }}>
              Member sejak {memberSince}
            </p>
          </div>

          {/* Gradient fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to bottom, transparent 0%, var(--background) 100%)', pointerEvents: 'none', zIndex: 3 }} />
        </section>

        {/* ═══════ PROFILE CONTENT ═══════ */}
        <section style={{ padding: '0 5% 100px', maxWidth: '900px', margin: '0 auto' }}>
          {/* Success/Error Messages */}
          {message && (
            <div className="reveal" style={{ padding: '14px 20px', borderRadius: '14px', background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.2)', color: '#34c759', fontSize: '0.9rem', marginBottom: '24px', textAlign: 'center' }}>
              {message}
            </div>
          )}
          {error && (
            <div className="reveal" style={{ padding: '14px 20px', borderRadius: '14px', background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.2)', color: '#ff6b6b', fontSize: '0.9rem', marginBottom: '24px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {/* Profile Card */}
          <div className="reveal" style={{ background: 'var(--dark-surface-2)', borderRadius: '24px', padding: '40px 32px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
                Profil
              </h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>Nama</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid var(--dark-surface-3)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Ceritain dikit tentang lo..."
                    rows={3}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid var(--dark-surface-3)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>Password Baru <span style={{ opacity: 0.5 }}>(kosongkan kalau gak mau ganti)</span></label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 karakter"
                    minLength={6}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid var(--dark-surface-3)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'}
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary"
                    style={{ flex: 1, padding: '14px', fontSize: '0.95rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}
                  >
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setName(user.name);
                      setBio(user.bio || '');
                      setPassword('');
                      setError('');
                    }}
                    style={{ flex: 1, padding: '14px', fontSize: '0.95rem', fontWeight: 600, borderRadius: '12px', background: 'var(--dark-surface-3)', border: 'none', color: 'var(--foreground)', cursor: 'pointer', transition: 'all 0.3s' }}
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--dark-surface-3)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nama</span>
                  <span style={{ fontWeight: 500 }}>{user.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--dark-surface-3)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email</span>
                  <span style={{ fontWeight: 500 }}>{user.email}</span>
                </div>
                <div style={{ padding: '16px 0' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Bio</span>
                  <span style={{ fontWeight: 400, lineHeight: 1.7 }}>{user.bio || 'Belum ada bio. Klik Edit buat nambahin!'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '14px',
                background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.15)',
                color: '#ff6b6b', fontSize: '0.9rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.1)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>

          {/* ═══════ FAVORITES SECTION ═══════ */}
          <div className="reveal" style={{ marginTop: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
                Destinasi Favorit
              </h2>
              <span style={{ background: 'rgba(255,107,53,0.15)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, padding: '4px 12px', borderRadius: '50px' }}>
                {favoriteDestinations.length}
              </span>
            </div>

            {favoriteDestinations.length === 0 ? (
              <div style={{
                background: 'var(--dark-surface-2)', borderRadius: '24px', padding: '60px 32px',
                border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center',
              }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block' }}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Belum ada destinasi favorit. Explore dan simpan tempat yang lo suka!
                </p>
                <a href="/destinations" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '12px',
                  background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)',
                  color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
                  transition: 'all 0.3s',
                }}>
                  Jelajahi Destinasi
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}>
                {favoriteDestinations.map((dest) => (
                  <div key={dest.slug} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: 'var(--dark-surface-2)', border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <a href={`/destinations/${dest.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                        <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', pointerEvents: 'none' }} />
                        <span style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                          {dest.category}
                        </span>
                      </div>
                      <div style={{ padding: '16px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: 'var(--foreground)' }}>
                          {dest.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {dest.location}
                        </div>
                      </div>
                    </a>
                    {/* Remove favorite button */}
                    <button
                      onClick={() => toggleFavorite(dest.slug)}
                      style={{
                        position: 'absolute', top: '12px', right: '12px', zIndex: 5,
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: 'rgba(255,59,48,0.9)', border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      aria-label="Hapus dari favorit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
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
