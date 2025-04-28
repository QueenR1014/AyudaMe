'use client'
import { useState, FormEvent, useEffect } from 'react'
import { X, Check } from 'lucide-react'

type Frequency = 'daily' | 'days' | 'interval'

interface Props {
  visible: boolean
  onClose: () => void
  onSave: (data: any) => void
}

export default function AddMedicineModal({ visible, onClose, onSave }: Props) {
  /* ─────────── Campos del formulario ─────────── */
  const [nombre, setNombre] = useState('')
  const [dosis, setDosis] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('daily')
  const [selectedDays, setSelectedDays] = useState<number[]>([])  // 0-6
  const [intervalDays, setIntervalDays] = useState(2)
  const [timesPerDay, setTimesPerDay] = useState(1)
  const [hours, setHours] = useState<string[]>(['08:00'])

  /* Ajustar array de horas al cambiar “veces al día” */
  useEffect(() => {
    setHours(h => {
      const copy = [...h]
      while (copy.length < timesPerDay) copy.push('08:00')
      return copy.slice(0, timesPerDay)
    })
  }, [timesPerDay])

  const toggleDay = (d: number) =>
    setSelectedDays(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])

  /* Guardar */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!nombre.trim()) return
    onSave({
      id: Date.now(),
      nombre: nombre.trim(),
      dosis: dosis.trim() || '—',
      plan: { frequency, selectedDays, intervalDays, timesPerDay, hours }
    })
    // reset
    setNombre(''); setDosis(''); setFrequency('daily')
    setSelectedDays([]); setIntervalDays(2); setTimesPerDay(1); setHours(['08:00'])
    onClose()
  }

  if (!visible) return null

  /* ─────────── UI ─────────── */
  const days = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/60 backdrop-blur-sm">
      <form onSubmit={handleSubmit}
            className="w-11/12 max-w-sm rounded-xl bg-white p-6 shadow-xl
                       flex flex-col gap-4 text-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Añadir medicina</h2>
          <button onClick={onClose} type="button">
            <X size={20} className="text-zinc-500" />
          </button>
        </div>

        {/* Nombre & dosis */}
        <label className="flex flex-col gap-1">
          Nombre
          <input required value={nombre} onChange={e=>setNombre(e.target.value)}
                 className="rounded border px-3 py-2"/>
        </label>
        <label className="flex flex-col gap-1">
          Dosis (opcional)
          <input value={dosis} onChange={e=>setDosis(e.target.value)}
                 className="rounded border px-3 py-2"/>
        </label>

        {/* Frecuencia */}
        <fieldset className="flex flex-col gap-2">
          <legend className="font-medium">Frecuencia</legend>

          <label className="inline-flex items-center gap-2">
            <input type="radio" name="freq" value="daily"
                   checked={frequency==='daily'}
                   onChange={()=>setFrequency('daily')}/>
            Todos los días
          </label>

          <label className="inline-flex items-center gap-2">
            <input type="radio" name="freq" value="days"
                   checked={frequency==='days'}
                   onChange={()=>setFrequency('days')}/>
            Solo algunos días
          </label>

          {frequency==='days' &&
            <div className="flex flex-wrap gap-1 pl-6">
              {days.map((d,i)=>
                <button key={i} type="button"
                        onClick={()=>toggleDay(i)}
                        className={`px-2 py-1 rounded border
                         ${selectedDays.includes(i)
                           ? 'bg-teal-600 text-white'
                           : 'bg-zinc-100'}`}>
                  {d}
                </button>)}
            </div>}

          
        </fieldset>

        {/* Veces al día */}
        <label className="flex items-center gap-2">
          ¿Cuántas veces al día?
          <input type="number" min={1} max={6} value={timesPerDay}
                 onChange={e=>setTimesPerDay(+e.target.value)}
                 className="w-14 border rounded px-1 py-0.5"/>
        </label>

        {/* Horarios */}
        <div className="flex flex-col gap-2">
          <span className="font-medium">Horarios</span>
          {hours.map((h,idx)=>
            <input key={idx} type="time" value={h}
                   onChange={e=>{
                     const cp=[...hours]; cp[idx]=e.target.value; setHours(cp)
                   }}
                   className="border rounded px-2 py-1"/>)}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose}
                  className="px-4 py-2 bg-zinc-200 rounded">Cancelar</button>
          <button type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700
                             text-white rounded flex items-center gap-1">
            <Check size={16}/> Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
