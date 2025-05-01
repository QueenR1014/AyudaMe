'use client'
import { FC } from 'react'
import { Pill, XCircle } from 'lucide-react'

interface Props {
  id: number          // ①
  nombre: string
  dosis: string
  onDeleteRequest: (id:number,nombre:string)=>void   // ②
}

const TarjetaMedicina: FC<Props> = ({ id, nombre, dosis, onDeleteRequest }) => (
  <div className="relative aspect-square rounded-xl bg-zinc-800 p-3 shadow
                  flex flex-col justify-between text-zinc-100">

    {/* Botón eliminar ▸ esquina superior-derecha */}
    <button
    onClick={() => onDeleteRequest(id, nombre)}      // ←
    className="absolute top-1.5 right-1.5 text-zinc-400 hover:text-red-500"
  >
    <XCircle size={18} strokeWidth={1.8} />
  </button>

    {/* Icono + dosis */}
    <div className="flex items-center gap-2 text-sm">
      <Pill size={16} className="text-pink-500" />
      <span>{dosis}</span>
    </div>

    {/* Nombre */}
    <h3 className="text-lg font-semibold break-words">{nombre}</h3>
  </div>
)

export default TarjetaMedicina
