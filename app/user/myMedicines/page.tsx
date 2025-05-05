'use client'

import { useEffect, useState } from 'react'
import TarjetaMedicina from '@/components/tarjeta-medicina'
import TarjetaAgregar from '@/components/tarjeta-agregar'
import AddMedicineModal from '@/components/add-medicine-modal'
import ConfirmDeleteModal from '@/components/confirm-delete-modal'

const API_URL = '/api/medicine' // Replace with your actual API URL

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
  const [loaded, setLoaded] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<{ id: number; nombre: string } | null>(null)

  /* Fetch data from the API when the component is mounted */
  useEffect(() => {
    const fetchMedicinas = async () => {
      try {
        const response = await fetch(API_URL)
        if (response.ok) {
          const data = await response.json()
          setMedicinas(data)
        } else {
          console.error('Error loading medicines')
        }
      } catch (error) {
        console.error('Network error:', error)
      } finally {
        setLoaded(true)
      }
    }

    fetchMedicinas()
  }, [])

  /* Save data back to the backend */
  useEffect(() => {
    if (loaded) {
      const saveMedicinas = async () => {
        try {
          await fetch(API_URL, {
            method: 'PUT', // or 'POST' based on your API setup
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medicinas),
          })
        } catch (error) {
          console.error('Error saving medicines:', error)
        }
      }

      saveMedicinas()
    }
  }, [medicinas, loaded])

  const confirmarEliminacion = () => {
    if (!pendingDelete) return
    setMedicinas(prev => prev.filter(m => m.id !== pendingDelete.id))
    setPendingDelete(null)
  }

  return (
    <main className="p-4">
      <h1 className="mb-4 text-xl font-semibold">Medicinas</h1>

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

        <TarjetaAgregar onClick={() => setShowAdd(true)} />
      </div>

      <AddMedicineModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={data => {
          setMedicinas(prev => [...prev, data])
        }}
      />

      <ConfirmDeleteModal
        visible={pendingDelete !== null}
        nombre={pendingDelete?.nombre ?? ''}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmarEliminacion}
      />
    </main>
  )
}
