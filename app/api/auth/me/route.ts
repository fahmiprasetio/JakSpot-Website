import { NextResponse } from 'next/server';
import { userDB } from '@/lib/prisma';
import { getAuthCookie, verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await userDB.findById(payload.userId);

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
