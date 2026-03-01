import { createClient } from '@libsql/client';

const db = createClient({
  url: `file:${process.cwd().replace(/\\/g, '/')}/dev.db`,
});

// Helper to generate CUID-like IDs
function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `c${timestamp}${random}`;
}

// Auto-migrate: add role column if missing, create Review table
(async () => {
  try {
    // Add role column
    await db.execute({ sql: `ALTER TABLE User ADD COLUMN role TEXT NOT NULL DEFAULT 'user'`, args: [] });
  } catch { /* column already exists */ }
  try {
    await db.execute({
      sql: `CREATE TABLE IF NOT EXISTS Review (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        userName TEXT NOT NULL,
        destinationSlug TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id)
      )`,
      args: [],
    });
  } catch { /* table already exists */ }
})();

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

export const userDB = {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db.execute({
      sql: 'SELECT * FROM User WHERE email = ?',
      args: [email],
    });
    if (result.rows.length === 0) return null;
    const row = result.rows[0] as unknown as User;
    return { ...row, role: (row.role || 'user') as UserRole };
  },

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const result = await db.execute({
      sql: 'SELECT id, name, email, bio, avatar, role, createdAt, updatedAt FROM User WHERE id = ?',
      args: [id],
    });
    if (result.rows.length === 0) return null;
    const row = result.rows[0] as unknown as Omit<User, 'password'>;
    return { ...row, role: (row.role || 'user') as UserRole };
  },

  async create(data: { name: string; email: string; password: string; role?: UserRole }): Promise<User> {
    const id = generateId();
    const now = new Date().toISOString();
    const role = data.role || 'user';
    await db.execute({
      sql: 'INSERT INTO User (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [id, data.name, data.email, data.password, role, now, now],
    });
    return { id, name: data.name, email: data.email, password: data.password, bio: null, avatar: null, role, createdAt: now, updatedAt: now };
  },

  async update(id: string, data: Record<string, string>): Promise<Omit<User, 'password'> | null> {
    const now = new Date().toISOString();
    const fields = { ...data, updatedAt: now };
    const setClauses = Object.keys(fields).map(k => `${k} = ?`).join(', ');
    const values = Object.values(fields);
    
    await db.execute({
      sql: `UPDATE User SET ${setClauses} WHERE id = ?`,
      args: [...values, id],
    });
    
    return this.findById(id);
  },
};

export const reviewDB = {
  async findByDestination(slug: string): Promise<Review[]> {
    const result = await db.execute({
      sql: 'SELECT * FROM Review WHERE destinationSlug = ? ORDER BY createdAt DESC',
      args: [slug],
    });
    return result.rows as unknown as Review[];
  },

  async create(data: { userId: string; userName: string; destinationSlug: string; rating: number; comment: string }): Promise<Review> {
    const id = generateId();
    const now = new Date().toISOString();
    await db.execute({
      sql: 'INSERT INTO Review (id, userId, userName, destinationSlug, rating, comment, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      args: [id, data.userId, data.userName, data.destinationSlug, data.rating, data.comment, now],
    });
    return { id, ...data, createdAt: now };
  },

  async delete(id: string): Promise<void> {
    await db.execute({ sql: 'DELETE FROM Review WHERE id = ?', args: [id] });
  },

  async findById(id: string): Promise<Review | null> {
    const result = await db.execute({ sql: 'SELECT * FROM Review WHERE id = ?', args: [id] });
    return (result.rows[0] as unknown as Review) || null;
  },

  async update(id: string, data: { rating: number; comment: string }): Promise<Review | null> {
    await db.execute({
      sql: 'UPDATE Review SET rating = ?, comment = ? WHERE id = ?',
      args: [data.rating, data.comment, id],
    });
    const result = await db.execute({ sql: 'SELECT * FROM Review WHERE id = ?', args: [id] });
    return (result.rows[0] as unknown as Review) || null;
  },
};

export default db;
