import { getSession } from "@/context/session"
export default function MyMedicines({session}:{session: {isLoggedIn:boolean, userEmail: string }}){
   
    
    return (
        <>
        
        <h1>medicinas</h1>
        <p>Bienvenido, {session.userEmail || 'Usuario'} </p>
        </>
    )
}

export async function getServerSideProps(){
    const session = await getSession();

    return{
        props:{
            session
        }
    };
}