import Head from 'next/head'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <>
    <h1 className='justified'>Portal de Inicio</h1>
      <LoginForm />
    </>
  )
}

