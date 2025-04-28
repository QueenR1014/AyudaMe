'use client'
import { X } from 'lucide-react'

interface Props {
  visible: boolean
  nombre: string
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDeleteModal({
  visible,
  nombre,
  onCancel,
  onConfirm
}: Props) {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/60 backdrop-blur-sm">
      <div className="w-80 rounded-xl bg-white p-6 shadow-xl flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Eliminar medicina</h2>
          <button onClick={onCancel} aria-label="Cerrar">
            <X size={20} className="text-zinc-500" />
          </button>
        </div>

        <p className="text-sm">
          ¿Seguro que deseas eliminar <strong>{nombre}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-zinc-200 hover:bg-zinc-300 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
