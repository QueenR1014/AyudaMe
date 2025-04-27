import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function UserPageLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies(); 
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    redirect('/login'); // no session? go to login page
  }

  // Optionally parse and validate session data
  try {
    const sessionData = JSON.parse(sessionCookie.value);
    if (!sessionData.userId) {
      redirect('/login');
    }
    // you could also validate userId here if you want
  } catch (error) {
    redirect('/login'); // malformed session cookie
  }

  return (
    <>
      <h1>Bienvenido, //add username</h1>
      {children}
    </>
  )
}
