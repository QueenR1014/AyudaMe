'use client'
import { useEffect, useState } from 'react'
import TarjetaMedicina from '@/components/tarjeta-medicina'
import TarjetaAgregar  from '@/components/tarjeta-agregar'
import AddMedicineModal from '@/components/add-medicine-modal'

const STORAGE_KEY = 'medicinasV2'

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

export default function MyMedicines() {
  const [medicinas, setMedicinas] = useState<Medicina[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loaded, setLoaded] = useState(false)        // ← NUEVO

  /* 1️⃣  Cargar una sola vez */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setMedicinas(JSON.parse(raw))
    } finally {
      setLoaded(true)                                // ← marcamos “ya cargué”
    }
  }, [])

  /* 2️⃣  Guardar sólo después de la carga inicial */
  useEffect(() => {
    if (!loaded) return           // ← se salta la primera pasada
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicinas))
  }, [medicinas, loaded])

  return (
    <main className="p-4">
      <h1 className="mb-4 text-xl font-semibold">Medicinas</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {medicinas.map(m => (
          <TarjetaMedicina key={m.id} nombre={m.nombre} dosis={m.dosis}/>
        ))}
        <TarjetaAgregar onClick={() => setShowModal(true)} />
      </div>

      <AddMedicineModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={(data) => setMedicinas(prev => [...prev, data])}
      />
    </main>
  )
}
