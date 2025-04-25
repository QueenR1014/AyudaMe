import Link from 'next/link'

export default function Home() {
  return (
    <>
    <h1 className='justified'>Portal de Inicio</h1>
    <p>Acá no hay nada, porque no has iniciado sesión</p>
      <Link href="/login">
        <button className=''>
          Iniciar Sesión
        </button>
      </Link>
    </>
  )
}

