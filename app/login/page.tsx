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
    
    const handleRegister = () =>{
        router.push('/register') //redirigir a página de registro
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
            <button type = "submit" className = 'w-full bg-[#F57430] text-white py-2 rounded'>Entrar</button>
        </form>


        <p className='flex justify-center mt-4 text-gray-500'>
            ¿No tienes cuenta? Crea una:
        </p>
        {/*Boton de Registro*/}
        <div className='text-center'>
            <button
                onClick = {handleRegister}
                className='w-full bg-[#F57430] text-white py-2 rounded'
            >
                Registrarse
            </button>
        </div>
        </>
    )
}