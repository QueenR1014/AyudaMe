import Link from 'next/link'

export default function Home() {
  return (
    <>
    <h1 className='justified'>Portal de Inicio</h1>
    <p>Acá no hay nada, porque no has iniciado sesión</p>
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

