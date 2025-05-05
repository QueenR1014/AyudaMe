import Link from 'next/link'
import { isUserLoggedIn } from './api/login/check_logged'
import {redirect} from 'next/navigation'
export default async function Home() {
  
  const isLoggedIn = await isUserLoggedIn();

  if(isLoggedIn){
    redirect('/user/myMedicines')
  }
  return (
    <>
    <h1 className='flex justify-center'>Portal de Inicio</h1>
    
      <div className = 'flex justify-center'>
        <Link href="/login">
          <button className='border-gray-400 shadow-md hover:shadow-lg p-2 rounded-md cursor-pointer'>
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </>
  )
}
