'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

type TabType = 'destinations' | 'events';

interface DataItem {
  slug: string;
  name?: string;
  title?: string;
  category: string;
  location?: string;
  venue?: string;
  image: string;
  description?: string;
  [key: string]: unknown;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('destinations');
  const [items, setItems] = useState<DataItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Add form state
  const [formData, setFormData] = useState({
    slug: '', name: '', title: '', category: '', location: '', venue: '',
    address: '', image: '', description: '', longDescription: '',
    priceRange: '', openHours: '', date: '', time: '', ticketPrice: '',
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  const fetchData = async (type: TabType) => {
    setLoadingData(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/data?type=${type}`);
      const data = await res.json();
      if (res.ok) setItems(data.items || []);
      else setError(data.error || 'Gagal memuat data');
    } catch {
      setError('Koneksi error');
    }
    setLoadingData(false);
  };

  useEffect(() => {
    if (user && user.role === 'admin') fetchData(activeTab);
  }, [activeTab, user]);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Yakin mau hapus "${slug}"?`)) return;
    setDeleting(slug);
    setMessage('');
    try {
      const res = await fetch(`/api/admin/data?type=${activeTab}&slug=${slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        fetchData(activeTab);
      } else {
        setError(data.error || 'Gagal hapus');
      }
    } catch {
      setError('Koneksi error');
    }
    setDeleting(null);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const item: Record<string, unknown> = {
      id: Date.now(),
      slug: formData.slug,
      category: formData.category,
      image: formData.image,
      gallery: [formData.image],
      description: formData.description,
      longDescription: formData.longDescription,
      highlights: [],
      coords: { lat: -6.2, lng: 106.8 },
      tips: [],
    };

    if (activeTab === 'destinations') {
      item.name = formData.name;
      item.location = formData.location;
      item.address = formData.address;
      item.priceRange = formData.priceRange;
      item.openHours = formData.openHours;
    } else {
      item.title = formData.title;
      item.location = formData.location;
      item.venue = formData.venue;
      item.address = formData.address;
      item.date = formData.date;
      item.dateStart = new Date().toISOString().split('T')[0];
      item.time = formData.time;
      item.ticketPrice = formData.ticketPrice;
    }

    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, item }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setShowAddForm(false);
        setFormData({ slug: '', name: '', title: '', category: '', location: '', venue: '', address: '', image: '', description: '', longDescription: '', priceRange: '', openHours: '', date: '', time: '', ticketPrice: '' });
        fetchData(activeTab);
      } else {
        setError(data.error || 'Gagal menambahkan');
      }
    } catch {
      setError('Koneksi error');
    }
  };

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <>
        <Navbar variant="subpage" />
        <main style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading...</div>
        </main>
      </>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: '12px',
    border: '2px solid var(--dark-surface-3)', background: 'var(--dark-surface)',
    color: 'var(--foreground)', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color 0.3s', boxSizing: 'border-box',
  };

  return (
    <>
      <Navbar variant="subpage" />
      <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ position: 'relative', padding: '120px 5% 60px', textAlign: 'center' }}>
          <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', bottom: '-80px', left: '-80px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', margin: '0 auto 20px', boxShadow: '0 12px 40px rgba(99,102,241,0.3)' }}>
              🔧
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '8px' }}>
              Admin <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Kelola destinasi dan event JakSpot
            </p>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(to bottom, transparent 0%, var(--background) 100%)', pointerEvents: 'none', zIndex: 3 }} />
        </section>

        {/* Content */}
        <section style={{ padding: '0 5% 100px', maxWidth: '1100px', margin: '0 auto' }}>
          {/* Messages */}
          {message && (
            <div style={{ padding: '14px 20px', borderRadius: '14px', background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.2)', color: '#34c759', fontSize: '0.9rem', marginBottom: '24px', textAlign: 'center' }}>
              {message}
            </div>
          )}
          {error && (
            <div style={{ padding: '14px 20px', borderRadius: '14px', background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.2)', color: '#ff6b6b', fontSize: '0.9rem', marginBottom: '24px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {/* Tab Switcher */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', background: 'var(--dark-surface-2)', borderRadius: '14px', padding: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
            {([{ key: 'destinations' as TabType, label: '📍 Destinasi' }, { key: 'events' as TabType, label: '🎉 Event' }]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setShowAddForm(false); setMessage(''); setError(''); }}
                style={{
                  flex: 1, padding: '14px', borderRadius: '11px', border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s', fontSize: '0.95rem', fontWeight: 600,
                  background: activeTab === tab.key ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                  color: activeTab === tab.key ? 'white' : 'var(--text-muted)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
              {activeTab === 'destinations' ? 'Semua Destinasi' : 'Semua Event'} ({items.length})
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: showAddForm ? 'var(--dark-surface-3)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.3s',
              }}
            >
              {showAddForm ? '✕ Batal' : '＋ Tambah'}
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div style={{ background: 'var(--dark-surface-2)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px' }}>
                Tambah {activeTab === 'destinations' ? 'Destinasi' : 'Event'} Baru
              </h3>
              <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Slug (URL)</label>
                  <input style={inputStyle} required value={formData.slug} onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))} placeholder="contoh-slug" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                </div>
                {activeTab === 'destinations' ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Nama</label>
                    <input style={inputStyle} required value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Nama destinasi" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Judul</label>
                    <input style={inputStyle} required value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="Judul event" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Kategori</label>
                  <input style={inputStyle} required value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} placeholder="Kopi, Cafe, Bar, dll" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Lokasi</label>
                  <input style={inputStyle} required value={formData.location} onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))} placeholder="Jakarta Selatan" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                </div>
                {activeTab === 'events' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Venue</label>
                      <input style={inputStyle} value={formData.venue} onChange={(e) => setFormData(p => ({ ...p, venue: e.target.value }))} placeholder="Nama venue" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Tanggal</label>
                      <input style={inputStyle} value={formData.date} onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))} placeholder="Maret 2026" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Waktu</label>
                      <input style={inputStyle} value={formData.time} onChange={(e) => setFormData(p => ({ ...p, time: e.target.value }))} placeholder="18:00 - 23:00" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Harga Tiket</label>
                      <input style={inputStyle} value={formData.ticketPrice} onChange={(e) => setFormData(p => ({ ...p, ticketPrice: e.target.value }))} placeholder="Rp 50k - 200k" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                    </div>
                  </>
                )}
                {activeTab === 'destinations' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Harga</label>
                      <input style={inputStyle} value={formData.priceRange} onChange={(e) => setFormData(p => ({ ...p, priceRange: e.target.value }))} placeholder="Rp 30k - 80k" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Jam Buka</label>
                      <input style={inputStyle} value={formData.openHours} onChange={(e) => setFormData(p => ({ ...p, openHours: e.target.value }))} placeholder="08:00 - 22:00" onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                    </div>
                  </>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Alamat</label>
                  <input style={inputStyle} value={formData.address} onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))} placeholder="Jl. ..." onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>URL Gambar</label>
                  <input style={inputStyle} required value={formData.image} onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))} placeholder="https://..." onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Deskripsi Singkat</label>
                  <input style={inputStyle} required value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} placeholder="Deskripsi singkat..." onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Deskripsi Lengkap</label>
                  <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }} value={formData.longDescription} onChange={(e) => setFormData(p => ({ ...p, longDescription: e.target.value }))} placeholder="Ceritain lengkap..." onFocus={(e) => e.target.style.borderColor = '#6366f1'} onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'} />
                </div>
                <div style={{ gridColumn: '1 / -1', textAlign: 'right' }}>
                  <button type="submit" style={{ padding: '12px 32px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}>
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Items List */}
          {loadingData ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading...</div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Belum ada data.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map((item) => {
                const displayName = item.name || item.title || item.slug;
                return (
                  <div
                    key={item.slug}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      background: 'var(--dark-surface-2)', borderRadius: '16px',
                      padding: '16px 20px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={item.image} alt={String(displayName)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {String(displayName)}
                      </h3>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <span style={{ background: 'rgba(99,102,241,0.1)', padding: '2px 10px', borderRadius: '50px', color: '#818cf8' }}>{item.category}</span>
                        <span>{item.location || item.venue}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(item.slug)}
                      disabled={deleting === item.slug}
                      style={{
                        padding: '8px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                        background: 'rgba(255,59,48,0.1)', color: '#ff6b6b',
                        fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.3s',
                        opacity: deleting === item.slug ? 0.5 : 1,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.2)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.1)'; }}
                    >
                      {deleting === item.slug ? '...' : 'Hapus'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer showNewsletter={false} />

      <style jsx global>{`
        @media (max-width: 700px) {
          form[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
