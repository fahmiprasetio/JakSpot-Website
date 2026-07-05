import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookie, verifyToken } from '@/lib/auth';
import { userDB, prisma } from '@/lib/prisma';
import { getDestinations, getEvents } from '@/lib/data';

// Middleware: verify admin
async function verifyAdmin() {
  const token = await getAuthCookie();
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  const user = await userDB.findById(payload.userId);
  if (!user || user.role !== 'admin') return null;
  return user;
}

// GET /api/admin/data?type=destinations|events
export async function GET(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Admin access required' }, { status: 403 });

  const type = req.nextUrl.searchParams.get('type') || 'destinations';
  const items = type === 'events' ? await getEvents() : await getDestinations();

  return NextResponse.json({ items, count: items.length });
}

// POST /api/admin/data — add new item
export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Admin access required' }, { status: 403 });

  const { type, item } = await req.json();
  if (!type || !item) return NextResponse.json({ error: 'type and item required' }, { status: 400 });

  try {
    if (type === 'events') {
      await prisma.event.create({
        data: {
          slug: item.slug,
          title: item.title,
          category: item.category,
          date: item.date ?? '',
          dateStart: item.dateStart ?? '',
          dateEnd: item.dateEnd ?? null,
          time: item.time ?? '',
          location: item.location ?? '',
          venue: item.venue ?? '',
          address: item.address ?? '',
          image: item.image ?? '',
          gallery: item.gallery ?? [],
          description: item.description ?? '',
          longDescription: item.longDescription ?? '',
          highlights: item.highlights ?? [],
          lineup: item.lineup ?? [],
          ticketPrice: item.ticketPrice ?? '',
          ticketLink: item.ticketLink ?? null,
          lat: item.coords?.lat ?? 0,
          lng: item.coords?.lng ?? 0,
          tips: item.tips ?? [],
          isFeatured: item.isFeatured ?? false,
        },
      });
    } else {
      await prisma.destination.create({
        data: {
          slug: item.slug,
          name: item.name,
          category: item.category,
          location: item.location ?? '',
          address: item.address ?? '',
          image: item.image ?? '',
          hoverImage: item.hoverImage ?? null,
          gallery: item.gallery ?? [],
          description: item.description ?? '',
          longDescription: item.longDescription ?? '',
          highlights: item.highlights ?? [],
          priceRange: item.priceRange ?? '',
          openHours: item.openHours ?? '',
          lat: item.coords?.lat ?? 0,
          lng: item.coords?.lng ?? 0,
          tips: item.tips ?? [],
        },
      });
    }
    return NextResponse.json(
      { message: `${type === 'events' ? 'Event' : 'Destinasi'} berhasil ditambahkan!` },
      { status: 201 },
    );
  } catch (error) {
    console.error('Admin create error:', error);
    return NextResponse.json({ error: 'Gagal menambahkan data. Pastikan slug unik.' }, { status: 500 });
  }
}

// DELETE /api/admin/data?type=destinations|events&slug=xxx
export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Admin access required' }, { status: 403 });

  const type = req.nextUrl.searchParams.get('type') || 'destinations';
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  const result =
    type === 'events'
      ? await prisma.event.deleteMany({ where: { slug } })
      : await prisma.destination.deleteMany({ where: { slug } });

  if (result.count === 0) return NextResponse.json({ error: 'Item tidak ditemukan.' }, { status: 404 });

  return NextResponse.json({ message: 'Item berhasil dihapus!' });
}
