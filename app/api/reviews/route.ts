import { NextRequest, NextResponse } from 'next/server';
import { reviewDB, userDB } from '@/lib/prisma';
import { getAuthCookie, verifyToken } from '@/lib/auth';

// GET /api/reviews?slug=xxx — get reviews for a destination
export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'slug required' }, { status: 400 });
    }
    const reviews = await reviewDB.findByDestination(slug);
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/reviews — create a review (user only)
export async function POST(req: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) return NextResponse.json({ error: 'Harus login dulu.' }, { status: 401 });
    
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await userDB.findById(payload.userId);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

    const { destinationSlug, rating, comment } = await req.json();
    if (!destinationSlug || !rating || !comment) {
      return NextResponse.json({ error: 'Semua field harus diisi.' }, { status: 400 });
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating antara 1-5.' }, { status: 400 });
    }

    const review = await reviewDB.create({
      userId: user.id,
      userName: user.name,
      destinationSlug,
      rating,
      comment,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE /api/reviews?id=xxx — delete a review (owner or admin)
export async function DELETE(req: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Review id required' }, { status: 400 });

    const review = await reviewDB.findById(id);
    if (!review) return NextResponse.json({ error: 'Review tidak ditemukan.' }, { status: 404 });

    // Allow delete if owner or admin
    if (review.userId !== payload.userId && payload.role !== 'admin') {
      return NextResponse.json({ error: 'Tidak punya izin.' }, { status: 403 });
    }

    await reviewDB.delete(id);
    return NextResponse.json({ message: 'Review dihapus.' });
  } catch (error) {
    console.error('Delete review error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT /api/reviews — edit a review (owner only)
export async function PUT(req: NextRequest) {
  try {
    const token = await getAuthCookie();
    if (!token) return NextResponse.json({ error: 'Harus login dulu.' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id, rating, comment } = await req.json();
    if (!id || !rating || !comment) {
      return NextResponse.json({ error: 'Semua field harus diisi.' }, { status: 400 });
    }

    const review = await reviewDB.findById(id);
    if (!review) return NextResponse.json({ error: 'Review tidak ditemukan.' }, { status: 404 });

    if (review.userId !== payload.userId) {
      return NextResponse.json({ error: 'Lo cuma bisa edit review sendiri.' }, { status: 403 });
    }

    const updated = await reviewDB.update(id, { rating, comment });
    return NextResponse.json({ review: updated });
  } catch (error) {
    console.error('Update review error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
