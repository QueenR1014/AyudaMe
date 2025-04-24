import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/PharmaSync.jpeg'
const NavBar = () => {
    return(
        <nav className = "w-full h-24 shadow-xl">
            <div className = "flex justify-between items-center h-full w-full px-4 2xl:px-16">
                {/*Imagen PharmaSync*/}
                <div className="w-1/4 relative h-full">
                    <Link href = "/">
                    <Image
                        src={Logo}
                        alt="Logo"
                        fill
                        className="object-contain cursor-pointer"
                        priority
                    />
                    </Link>
                </div>
                {/*Imagen AyudaMe*/}
                <div className='flex'>
                <h1 className="text-4xl font-bold">AyudaMe</h1>
                </div>
                {/*NavMenu*/}
                <div className='flex'>
                    <ul className='centered flex'>
                        <Link href = "/">
                        <li className='ml-10 uppercase hover:border text-xl'>Inicio</li> 
                        </Link>
                        <Link href = "/aboutus">
                        <li className='ml-10 uppercase hover:border text-xl'>Sobre Nosotros</li> 
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar