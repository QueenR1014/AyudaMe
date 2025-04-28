// app/components/tarjeta-agregar.tsx
'use client'
import { Plus } from 'lucide-react'

export default function TarjetaAgregar({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="aspect-square rounded-xl border-2 border-dashed
                 border-zinc-600 flex flex-col items-center justify-center
                 text-zinc-500 hover:bg-zinc-700/40 transition"
    >
      <Plus size={28} />
      <span className="text-sm mt-1">Añadir</span>
    </button>
  )
}
