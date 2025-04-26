import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';

//checkear todo bajo @/app/user/ que la sesión del usuario esté iniciada
export default function UserPageLayout({children}: { children: ReactNode }){
    const cookieStore = cookies(); 
    //const session = cookieStore.get('session');
    
    
    return (
        <>
        <h1>Esto Debería aparecer solo en las de User</h1>
        {children}
        </>
    )
}