import { NextRequest, NextResponse } from 'next/server';
import { getDestinations } from '@/lib/data';

// GET /api/destinations?category=Kopi
export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get('category') || undefined;
    const destinations = await getDestinations(category ?? undefined);
    return NextResponse.json({ destinations });
  } catch (error) {
    console.error('Get destinations error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
