import { NextRequest, NextResponse } from 'next/server';
import { userDB } from '@/lib/prisma';
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Semua field harus diisi ya, bray.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter dong.' },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await userDB.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email ini udah terdaftar. Coba login aja.' },
        { status: 409 }
      );
    }

    // Create user
    const hashedPassword = await hashPassword(password);
    const user = await userDB.create({ name, email, password: hashedPassword });

    // Sign token & set cookie
    const token = signToken({ userId: user.id, email: user.email });
    await setAuthCookie(token);

    return NextResponse.json(
      {
        message: 'Akun lo berhasil dibuat!',
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Ada masalah di server. Coba lagi nanti ya.' },
      { status: 500 }
    );
  }
}
