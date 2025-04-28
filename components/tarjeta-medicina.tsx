// app/components/tarjeta-medicina.tsx
'use client'
import { FC } from 'react'
import { Pill } from 'lucide-react'       // ícono de muestra

interface Props {
  nombre: string
  dosis: string
}

const TarjetaMedicina: FC<Props> = ({ nombre, dosis }) => (
  <div className="aspect-square rounded-xl bg-zinc-800 p-3 shadow
                  flex flex-col justify-between text-zinc-100">
    {/* Icono + dosis */}
    <div className="flex items-center gap-2 text-sm">
      <Pill size={16} className="text-pink-500" />
      <span>{dosis}</span>
    </div>

    {/* Nombre del medicamento */}
    <h3 className="text-lg font-semibold">{nombre}</h3>
  </div>
)

export default TarjetaMedicina
