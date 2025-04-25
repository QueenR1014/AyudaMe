import Link from 'next/link'
import {CalendarHeart, NotebookText, Pill} from 'lucide-react'
export default function BottomMenu(){
    //Iconos para el menu (toca declarar las rutas)
    const my_medicines = '';
    const calendar = '';
    const register = '';

    return(
        <div className="flex justify-around items-center w-full h-full bg-[#307D85] text-white">
        {/* Mis Medicinas */}
        <Link href="/user/myMedicines" className="flex flex-col items-center">
            <Pill size = {24}/>
            <span>Medicinas</span>
        </Link>

        {/* Calendario */}
        <Link href="/user/calendar" className="flex flex-col items-center">
            <CalendarHeart size = {24}/>
            <span>Calendario</span>
        </Link>

        {/* Historial*/}
        <Link href="/user/history" className="flex flex-col items-center">
            <NotebookText size = {24}/>
            <span>Registro</span>
        </Link>
    </div>
    )
}