import { NextRequest, NextResponse } from 'next/server';
import { getAuthCookie, verifyToken } from '@/lib/auth';
import { userDB } from '@/lib/prisma';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

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

// Helper: read/write datasource files
function getDestinationsPath() {
  return join(process.cwd(), 'app', 'data', 'destinations.ts');
}
function getEventsPath() {
  return join(process.cwd(), 'app', 'data', 'events.ts');
}

function parseDataArray(filePath: string): { items: unknown[]; raw: string } {
  const raw = readFileSync(filePath, 'utf-8');
  // Find the array assignment (e.g., "= [") — skip brackets inside type annotations like string[]
  const assignMatch = raw.match(/=\s*\[/);
  if (!assignMatch || assignMatch.index === undefined) return { items: [], raw };
  const firstBracket = raw.indexOf('[', assignMatch.index);
  const lastBracket = raw.lastIndexOf('];');
  if (firstBracket === -1 || lastBracket === -1) return { items: [], raw };

  const arrayStr = raw.substring(firstBracket, lastBracket + 1);
  // Evaluate using Function (safe for server-side known content)
  try {
    const items = new Function(`return ${arrayStr}`)();
    return { items, raw };
  } catch {
    return { items: [], raw };
  }
}

// GET /api/admin/data?type=destinations|events
export async function GET(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Admin access required' }, { status: 403 });

  const type = req.nextUrl.searchParams.get('type') || 'destinations';
  const filePath = type === 'events' ? getEventsPath() : getDestinationsPath();
  const { items } = parseDataArray(filePath);

  return NextResponse.json({ items, count: items.length });
}

// POST /api/admin/data — add new item
export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Admin access required' }, { status: 403 });

  const { type, item } = await req.json();
  if (!type || !item) return NextResponse.json({ error: 'type and item required' }, { status: 400 });

  const filePath = type === 'events' ? getEventsPath() : getDestinationsPath();
  const raw = readFileSync(filePath, 'utf-8');
  
  // Find the position of the closing ]; of the array
  const closingIdx = raw.lastIndexOf('];');
  if (closingIdx === -1) return NextResponse.json({ error: 'Could not parse data file' }, { status: 500 });

  // Convert item to TypeScript-compatible string
  const itemStr = JSON.stringify(item, null, 2).replace(/"([^"]+)":/g, '$1:');
  const newRaw = raw.substring(0, closingIdx) + `  ${itemStr},\n` + raw.substring(closingIdx);
  
  writeFileSync(filePath, newRaw, 'utf-8');

  return NextResponse.json({ message: `${type === 'events' ? 'Event' : 'Destinasi'} berhasil ditambahkan!` }, { status: 201 });
}

// DELETE /api/admin/data?type=destinations|events&slug=xxx
export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) return NextResponse.json({ error: 'Admin access required' }, { status: 403 });

  const type = req.nextUrl.searchParams.get('type') || 'destinations';
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

  const filePath = type === 'events' ? getEventsPath() : getDestinationsPath();
  const raw = readFileSync(filePath, 'utf-8');

  // Find the object block containing this slug and remove it
  // We look for a pattern like:  { ... slug: 'xxx' ... }, (a full object)
  const slugPattern = new RegExp(
    `\\{[\\s\\S]*?slug:\\s*['"]${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][\\s\\S]*?\\},?\\n`,
    'g'
  );

  const newRaw = raw.replace(slugPattern, '');
  
  if (newRaw === raw) {
    return NextResponse.json({ error: 'Item tidak ditemukan.' }, { status: 404 });
  }

  writeFileSync(filePath, newRaw, 'utf-8');

  return NextResponse.json({ message: `Item berhasil dihapus!` });
}
