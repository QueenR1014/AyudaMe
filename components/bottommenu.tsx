import Image from 'next/image'
import Link from 'next/link'
export default function BottomMenu(){
    //Iconos para el menu (toca declarar las rutas)
    const my_medicines = '';
    const calendar = '';
    const register = '';

    return(
        <div className="flex justify-around items-center w-full h-full bg-[#307D85] text-white">
        {/* Mis Medicinas */}
        <Link href="/user/myMedicines" className="flex flex-col items-center">
            <Image src={my_medicines} alt="Mis Medicinas" width={24} height={24} />
            <span>Medicinas</span>
        </Link>

        {/* Calendario */}
        <Link href="/user/calendar" className="flex flex-col items-center">
            <Image src={calendar} alt="Calendario" width={24} height={24} />
            <span>Calendario</span>
        </Link>

        {/* Historial*/}
        <Link href="/user/history" className="flex flex-col items-center">
            <Image src={register} alt="Registro" width={24} height={24} />
            <span>Registro</span>
        </Link>
    </div>
    )
}