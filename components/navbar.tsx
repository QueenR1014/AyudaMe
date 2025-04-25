import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/PharmaSync.jpeg'
const NavBar = () => {
    return(
        <nav className = "w-full h-24 shadow-xl">
            <div className = "flex justify-between items-center h-full w-full px-4 2xl:px-16 relative">
                {/*Imagen PharmaSync*/}
                <div className="w-1/4 relative h-full min-w-40 shrink-0">
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
                
                <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">AyudaMe</h1>
            
            </div>
        </nav>
    )
}

export default NavBar