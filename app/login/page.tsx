'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';


export default function Loginpage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-type':'application/json'}
        });

        if (res.ok){
            router.push('/user/myMedicines')
        }else{
            alert('Login incorrecto');
        }
    };
    
    return (
        <>
        
        <form onSubmit ={handleLogin} className='max-w-md mx-auto space-y-4'>
            <h2 className = 'text-2xl font-bold'>Accede a AyudaMe</h2>
            <input
                type= "email" 
                placeholder='Correo'
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                className='w-full p-2 border rounded'
                required
            />
            <input
                type = 'password'
                placeholder = 'Contraseña'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                className='w-full p-2 border rounded'
                required
            />
            <button type = "submit" className = 'w-full bg-blue-600 text-white py-2 rounded'>Entrar</button>
        </form>
        </>
    )
}