import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';

export async function POST() {
  try {
    await removeAuthCookie();
    return NextResponse.json({ message: 'Logout berhasil.' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Gagal logout. Coba lagi.' },
      { status: 500 }
    );
  }
}
