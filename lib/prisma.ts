import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string | null;
  avatar: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  destinationSlug: string;
  rating: number;
  comment: string;
  createdAt: string;
}

type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string | null;
  avatar: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

type ReviewRecord = {
  id: string;
  userId: string;
  userName: string;
  destinationSlug: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

function mapUser(u: UserRecord): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    password: u.password,
    bio: u.bio,
    avatar: u.avatar,
    role: (u.role as UserRole) || 'user',
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  };
}

function mapReview(r: ReviewRecord): Review {
  return {
    id: r.id,
    userId: r.userId,
    userName: r.userName,
    destinationSlug: r.destinationSlug,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt.toISOString(),
  };
}

export const userDB = {
  async findByEmail(email: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { email } });
    return u ? mapUser(u) : null;
  },

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u) return null;
    const { password: _password, ...rest } = mapUser(u);
    void _password;
    return rest;
  },

  async create(data: { name: string; email: string; password: string; role?: UserRole }): Promise<User> {
    const u = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || 'user',
      },
    });
    return mapUser(u);
  },

  async update(id: string, data: Record<string, string>): Promise<Omit<User, 'password'> | null> {
    await prisma.user.update({
      where: { id },
      data: data as unknown as { name?: string; email?: string; bio?: string; avatar?: string; password?: string; role?: string },
    });
    return userDB.findById(id);
  },
};

export const reviewDB = {
  async findByDestination(slug: string): Promise<Review[]> {
    const rows = await prisma.review.findMany({
      where: { destinationSlug: slug },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(mapReview);
  },

  async create(data: { userId: string; userName: string; destinationSlug: string; rating: number; comment: string }): Promise<Review> {
    const r = await prisma.review.create({ data });
    return mapReview(r);
  },

  async delete(id: string): Promise<void> {
    await prisma.review.delete({ where: { id } });
  },

  async findById(id: string): Promise<Review | null> {
    const r = await prisma.review.findUnique({ where: { id } });
    return r ? mapReview(r) : null;
  },

  async update(id: string, data: { rating: number; comment: string }): Promise<Review | null> {
    const r = await prisma.review.update({ where: { id }, data });
    return mapReview(r);
  },
};

export default prisma;
