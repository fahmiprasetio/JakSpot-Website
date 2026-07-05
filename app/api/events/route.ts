import { NextRequest, NextResponse } from 'next/server';
import { getEvents, getFeaturedEvents } from '@/lib/data';

// GET /api/events?category=Musik&featured=true
export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category') || undefined;
    const featured = req.nextUrl.searchParams.get('featured');
    const events = featured === 'true' ? await getFeaturedEvents() : await getEvents(category ?? undefined);
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
