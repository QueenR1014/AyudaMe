import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  // Fetch user from Supabase
  const { data: users, error } = await supabase
    .from('User')
    .select('*')
    .eq('email', email)
    .limit(1)
    .single(); // Only return one user

  if (error || !users) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const user = users;

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Set a session cookie
  const response = NextResponse.json(
    { message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } },
    { status: 200 }
  );

  response.cookies.set('session', JSON.stringify({ userId: user.id }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10, // 10 minutes
  });

  return response;
}
