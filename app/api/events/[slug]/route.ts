import { NextResponse } from 'next/server';
import { getEventBySlug } from '@/lib/data';

// GET /api/events/[slug]
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const event = await getEventBySlug(slug);
    if (!event) {
      return NextResponse.json({ error: 'Event tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ event });
  } catch (error) {
    console.error('Get event error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
