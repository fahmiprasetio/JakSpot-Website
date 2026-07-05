import { prisma } from './prisma';
import type { DestinationDetail } from '@/app/data/destinations';
import type { EventDetail } from '@/app/data/events';

type DestinationRow = {
  id: number;
  slug: string;
  name: string;
  category: string;
  location: string;
  address: string;
  image: string;
  hoverImage: string | null;
  gallery: string[];
  description: string;
  longDescription: string;
  highlights: string[];
  priceRange: string;
  openHours: string;
  lat: number;
  lng: number;
  tips: string[];
};

type EventRow = {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  dateStart: string;
  dateEnd: string | null;
  time: string;
  location: string;
  venue: string;
  address: string;
  image: string;
  gallery: string[];
  description: string;
  longDescription: string;
  highlights: string[];
  lineup: string[];
  ticketPrice: string;
  ticketLink: string | null;
  lat: number;
  lng: number;
  tips: string[];
  isFeatured: boolean;
};

function toDestination(d: DestinationRow): DestinationDetail {
  return {
    id: d.id,
    slug: d.slug,
    name: d.name,
    category: d.category,
    location: d.location,
    address: d.address,
    image: d.image,
    hoverImage: d.hoverImage ?? undefined,
    gallery: d.gallery,
    description: d.description,
    longDescription: d.longDescription,
    highlights: d.highlights,
    priceRange: d.priceRange,
    openHours: d.openHours,
    coords: { lat: d.lat, lng: d.lng },
    tips: d.tips,
  };
}

function toEvent(e: EventRow): EventDetail {
  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    category: e.category,
    date: e.date,
    dateStart: e.dateStart,
    dateEnd: e.dateEnd ?? undefined,
    time: e.time,
    location: e.location,
    venue: e.venue,
    address: e.address,
    image: e.image,
    gallery: e.gallery,
    description: e.description,
    longDescription: e.longDescription,
    highlights: e.highlights,
    lineup: e.lineup,
    ticketPrice: e.ticketPrice,
    ticketLink: e.ticketLink ?? undefined,
    coords: { lat: e.lat, lng: e.lng },
    tips: e.tips,
    isFeatured: e.isFeatured,
  };
}

export async function getDestinations(category?: string): Promise<DestinationDetail[]> {
  const rows = await prisma.destination.findMany({
    where: category && category !== 'Semua' ? { category } : undefined,
    orderBy: { id: 'asc' },
  });
  return rows.map((d) => toDestination(d));
}

export async function getDestinationBySlug(slug: string): Promise<DestinationDetail | null> {
  const d = await prisma.destination.findUnique({ where: { slug } });
  return d ? toDestination(d) : null;
}

export async function getDestinationCategories(): Promise<string[]> {
  const rows = await prisma.destination.findMany({ select: { category: true }, distinct: ['category'] });
  return rows.map((r) => r.category);
}

export async function getEvents(category?: string): Promise<EventDetail[]> {
  const rows = await prisma.event.findMany({
    where: category && category !== 'Semua' ? { category } : undefined,
    orderBy: { dateStart: 'asc' },
  });
  return rows.map((e) => toEvent(e));
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const e = await prisma.event.findUnique({ where: { slug } });
  return e ? toEvent(e) : null;
}

export async function getFeaturedEvents(): Promise<EventDetail[]> {
  const rows = await prisma.event.findMany({ where: { isFeatured: true }, orderBy: { dateStart: 'asc' } });
  return rows.map((e) => toEvent(e));
}
