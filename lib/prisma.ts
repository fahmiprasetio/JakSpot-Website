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

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export const userDB = {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db.execute({
      sql: 'SELECT * FROM User WHERE email = ?',
      args: [email],
    });
    if (result.rows.length === 0) return null;
    return result.rows[0] as unknown as User;
  },

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const result = await db.execute({
      sql: 'SELECT id, name, email, bio, avatar, createdAt, updatedAt FROM User WHERE id = ?',
      args: [id],
    });
    if (result.rows.length === 0) return null;
    return result.rows[0] as unknown as Omit<User, 'password'>;
  },

  async create(data: { name: string; email: string; password: string }): Promise<User> {
    const id = generateId();
    const now = new Date().toISOString();
    await db.execute({
      sql: 'INSERT INTO User (id, name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
      args: [id, data.name, data.email, data.password, now, now],
    });
    return { id, name: data.name, email: data.email, password: data.password, bio: null, avatar: null, createdAt: now, updatedAt: now };
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

export default db;
