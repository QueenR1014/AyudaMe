import { ReactNode } from 'react';
import { isUserLoggedIn } from '../api/login/check_logged';
import { redirect } from 'next/navigation';
import { getUserName } from './name';
export default async function UserPageLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = await isUserLoggedIn();
  if(!isLoggedIn){
    redirect('/login')
  }
  const name = await getUserName(); 
  return (
    <>
      <h1>Bienvenido a AyudaMe, {name}.</h1>
      {children}
    </>
  )
}
