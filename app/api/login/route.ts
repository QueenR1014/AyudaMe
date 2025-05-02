import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg'; // Import the Pool class from the pg library
import bcrypt from 'bcrypt'; // Import bcrypt for password comparison

// Set up the PostgreSQL connection pool
const pool = new Pool({
  host: '192.168.0.4',
  user: 'main',
  password: '123456',
  database: 'ayudame',
  port: 5432,
});

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  //debbuging
  console.log(email, password);

  // Query the database to find the user by email
  try {
    const result = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);

    // If no user is found, return an error
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const user = result.rows[0];

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // If the user is found and the password is valid, return a successful login response
    const response = NextResponse.json(
      { message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } },
      { status: 200 }
    );

    // Set a cookie with user session info
    response.cookies.set('session', JSON.stringify({ userId: user.id }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production
      sameSite: 'lax',
      path: '/',
      maxAge: 600, // 10 minutes
    });

    return response;

  } catch (error) {
    console.error('Error querying database:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
