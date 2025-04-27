import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);
  // Build path to users.json
  const filePath = path.join(process.cwd(),'app','api', 'users', 'users.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const users = JSON.parse(fileContents);

  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json(
    { message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } },
    { status: 200 }
  );

  // Set a cookie with user session info
  response.cookies.set('session', JSON.stringify({ userId: user.id }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 2 * 60, // 2 min
  });

  return response;
}
