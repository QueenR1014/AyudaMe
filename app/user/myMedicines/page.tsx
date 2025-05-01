'use client'
import { useEffect, useState } from 'react'
import TarjetaMedicina      from '@/components/tarjeta-medicina'
import TarjetaAgregar       from '@/components/tarjeta-agregar'
import AddMedicineModal     from '@/components/add-medicine-modal'
import ConfirmDeleteModal   from '@/components/confirm-delete-modal'

const STORAGE_KEY = 'medicinasV2'

/* --------- Tipos --------- */
export interface Medicina {
  id: number
  nombre: string
  dosis: string
  plan: {
    frequency: 'daily' | 'days' | 'interval'
    selectedDays: number[]
    intervalDays: number
    timesPerDay: number
    hours: string[]
  }
}

/* --------- Página --------- */
export default function MyMedicines() {
  /* estado principal */
  const [medicinas, setMedicinas] = useState<Medicina[]>([])
  const [loaded, setLoaded] = useState(false)

  /* modales */
  const [showAdd, setShowAdd]   = useState(false)
  const [pendingDelete, setPendingDelete] =
    useState<{ id: number; nombre: string } | null>(null)

  /* 1️⃣  Cargar una sola vez */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setMedicinas(JSON.parse(raw))
    setLoaded(true)
  }, [])

  /* 2️⃣  Guardar sólo tras la carga inicial */
  useEffect(() => {
    if (loaded)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(medicinas))
  }, [medicinas, loaded])

  /* eliminar tras confirmación */
  const confirmarEliminacion = () => {
    if (!pendingDelete) return
    setMedicinas(prev => prev.filter(m => m.id !== pendingDelete.id))
    setPendingDelete(null)
  }

  return (
    <main className="p-4">
      <h1 className="mb-4 text-xl font-semibold">Medicinas</h1>

      {/* GRID DE TARJETAS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {medicinas.map(m => (
          <TarjetaMedicina
            key={m.id}
            id={m.id}
            nombre={m.nombre}
            dosis={m.dosis}
            onDeleteRequest={(id, nombre) =>
              setPendingDelete({ id, nombre })
            }
          />
        ))}

        {/* Tarjeta “+” */}
        <TarjetaAgregar onClick={() => setShowAdd(true)} />
      </div>

      {/* MODAL: Añadir */}
      <AddMedicineModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={data => setMedicinas(prev => [...prev, data])}
      />

      {/* MODAL: Confirmar borrado */}
      <ConfirmDeleteModal
        visible={pendingDelete !== null}
        nombre={pendingDelete?.nombre ?? ''}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmarEliminacion}
      />
    </main>
  )
}
