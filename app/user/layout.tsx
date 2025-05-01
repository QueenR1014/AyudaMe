import { ReactNode } from 'react';
import { isUserLoggedIn } from '../api/login/check_logged';
import { redirect } from 'next/navigation';

export default async function UserPageLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = await isUserLoggedIn();
  if(!isLoggedIn){
    redirect('/login')
  }else{
    redirect('/user/myMedicines')
  }
  return (
    <>
      <h1>Bienvenido, //add username</h1>
      {children}
    </>
  )
}
