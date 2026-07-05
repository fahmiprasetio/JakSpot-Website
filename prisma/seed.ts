import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import destinations from '../app/data/destinations';
import events from '../app/data/events';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding destinations...');
  for (const d of destinations) {
    const data = {
      slug: d.slug,
      name: d.name,
      category: d.category,
      location: d.location,
      address: d.address,
      image: d.image,
      hoverImage: d.hoverImage ?? null,
      gallery: d.gallery,
      description: d.description,
      longDescription: d.longDescription,
      highlights: d.highlights,
      priceRange: d.priceRange,
      openHours: d.openHours,
      lat: d.coords.lat,
      lng: d.coords.lng,
      tips: d.tips,
    };
    await prisma.destination.upsert({ where: { slug: d.slug }, update: data, create: { id: d.id, ...data } });
  }
  console.log(`✅ ${destinations.length} destinations seeded`);

  console.log('🌱 Seeding events...');
  for (const e of events) {
    const data = {
      slug: e.slug,
      title: e.title,
      category: e.category,
      date: e.date,
      dateStart: e.dateStart,
      dateEnd: e.dateEnd ?? null,
      time: e.time,
      location: e.location,
      venue: e.venue,
      address: e.address,
      image: e.image,
      gallery: e.gallery,
      description: e.description,
      longDescription: e.longDescription,
      highlights: e.highlights,
      lineup: e.lineup ?? [],
      ticketPrice: e.ticketPrice,
      ticketLink: e.ticketLink ?? null,
      lat: e.coords.lat,
      lng: e.coords.lng,
      tips: e.tips,
      isFeatured: e.isFeatured ?? false,
    };
    await prisma.event.upsert({ where: { slug: e.slug }, update: data, create: { id: e.id, ...data } });
  }
  console.log(`✅ ${events.length} events seeded`);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const password = await bcrypt.hash(adminPassword, 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { role: 'admin' },
      create: { name: 'Admin', email: adminEmail, password, role: 'admin' },
    });
    console.log(`✅ Admin account ready: ${adminEmail}`);
  } else {
    console.log('ℹ️  Set ADMIN_EMAIL & ADMIN_PASSWORD to auto-create an admin account.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
