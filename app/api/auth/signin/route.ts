import { NextRequest, NextResponse } from 'next/server';
import { userDB } from '@/lib/prisma';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi.' },
        { status: 400 }
      );
    }

    // Find user
    const user = await userDB.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Email atau password salah. Coba lagi.' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Email atau password salah. Coba lagi.' },
        { status: 401 }
      );
    }

    // Verify role match
    if (role === 'admin' && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Akun ini bukan akun administrator.' },
        { status: 403 }
      );
    }
    if (role === 'user' && user.role === 'admin') {
      // Admin can still login as admin via user login — just send their role back
    }

    // Sign token & set cookie
    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    await setAuthCookie(token);

    return NextResponse.json({
      message: 'Login berhasil!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'Ada masalah di server. Coba lagi nanti ya.' },
      { status: 500 }
    );
  }
}
