import { NextResponse } from 'next/server';
import { getDestinationBySlug } from '@/lib/data';

// GET /api/destinations/[slug]
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const destination = await getDestinationBySlug(slug);
    if (!destination) {
      return NextResponse.json({ error: 'Destinasi tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ destination });
  } catch (error) {
    console.error('Get destination error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
