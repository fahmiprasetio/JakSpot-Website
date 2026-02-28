import { NextRequest, NextResponse } from 'next/server';
import { userDB } from '@/lib/prisma';
import { getAuthCookie, verifyToken, hashPassword } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, bio, avatar, password } = await req.json();

    // Build update data
    const updateData: Record<string, string> = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: 'Password minimal 6 karakter.' },
          { status: 400 }
        );
      }
      updateData.password = await hashPassword(password);
    }

    const user = await userDB.update(payload.userId, updateData);

    return NextResponse.json({ user, message: 'Profil berhasil diupdate!' });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Gagal update profil. Coba lagi.' },
      { status: 500 }
    );
  }
}
