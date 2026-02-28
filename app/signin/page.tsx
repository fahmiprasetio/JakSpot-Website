'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) router.push('/profile');
  }, [user, router]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push('/profile');
    } else {
      setError(result.error || 'Gagal login. Coba lagi.');
    }
  };

  return (
    <>
      <Navbar variant="subpage" />

      <main style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 5% 80px' }}>
        {/* Decorative blurs */}
        <div style={{ position: 'fixed', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
        <div style={{ position: 'fixed', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,193,7,0.06) 0%, transparent 70%)', bottom: '-80px', left: '-80px', pointerEvents: 'none' }} />

        <div className="reveal" style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '60px', height: '60px', background: 'var(--gradient-1)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.8rem', color: 'white', margin: '0 auto 20px' }}>
              J
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>
              Welcome <span className="gradient-text">Back!</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Login dulu baru bisa explore lebih jauh.
            </p>
          </div>

          {/* Form Card */}
          <div style={{ background: 'var(--dark-surface-2)', borderRadius: '24px', padding: '40px 32px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@lo.com"
                  required
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid var(--dark-surface-3)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password lo"
                    required
                    style={{ width: '100%', padding: '14px 50px 14px 18px', borderRadius: '12px', border: '2px solid var(--dark-surface-3)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {showPassword ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.2)', color: '#ff6b6b', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '28px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--dark-surface-3)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>atau</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--dark-surface-3)' }} />
            </div>

            {/* Signup link */}
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Belum punya akun?{' '}
              <a href="/signup" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                Daftar dulu
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
