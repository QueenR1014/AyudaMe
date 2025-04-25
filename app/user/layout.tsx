'use client';

import {ReactNode} from 'react'
export default function UserPageLayout({children}: { children: ReactNode }){
    return (
        <>
        <h1>Esto Debería aparecer solo en las de User</h1>
        {children}
        </>
    )
}