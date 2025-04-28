'use client'
import { useEffect, useState } from 'react'
import type { Medicina } from '../myMedicines/page'

export default function Calendar() {
  const [medicinas, setMedicinas] = useState<Medicina[]>([])

  useEffect(()=>{
    const data = localStorage.getItem('medicinasV2')
    if (data) setMedicinas(JSON.parse(data))
  },[])

  /* ───── Generar eventos para la semana actual ───── */
  const start = new Date()                    // hoy
  start.setDate(start.getDate() - start.getDay()) // lunes 00:00
  const oneDay = 24*60*60*1000
  const events: Record<number,{name:string,time:string}[]> = {0:[],1:[],2:[],3:[],4:[],5:[],6:[]}

  medicinas.forEach(m=>{
    for (let d=0; d<7; d++){
      const date = new Date(start.getTime()+d*oneDay)
      const weekday = date.getDay()            // 0 = Sunday
      const isDue = m.plan.frequency==='daily'
        || (m.plan.frequency==='days' && m.plan.selectedDays.includes((weekday+6)%7)) // map Sun->Dom=6
        || (m.plan.frequency==='interval' && ((date.getTime()/oneDay) % m.plan.intervalDays===0))
      if (isDue)
        m.plan.hours.forEach(h=>events[d===0?6:d-1].push({name:m.nombre,time:h})) // columnas Lun=0…Dom=6
    }
  })

  /* Ordenar por hora */
  for (const d in events)
    events[d].sort((a,b)=>a.time.localeCompare(b.time))

  const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']

  /* …código de imports y generación de events se queda igual … */

return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Horario semanal</h1>
  
      <div className="overflow-x-auto">
        <div
          className="min-w-[42rem] grid grid-cols-7 rounded-lg
                     ring-1 ring-zinc-300 bg-white shadow-sm"
        >
          {/* Cabecera */}
          {dayNames.map((name) => (
            <div
              key={name}
              className="sticky top-0 z-10 text-center py-1.5 bg-teal-600
                         text-white font-semibold text-sm border-r
                         last:border-r-0 border-teal-700 rounded-t-lg"
            >
              {name}
            </div>
          ))}
  
          {/* Columnas con eventos */}
          {dayNames.map((_, colIdx) => (
            <div
              key={colIdx}
              className="h-80 border-r last:border-r-0 border-zinc-200
                         flex flex-col items-stretch p-1 gap-1"
            >
              {events[colIdx].length === 0 ? (
                <div className="flex-1 flex items-center justify-center
                                text-zinc-400 text-xs italic">
                  —
                </div>
              ) : (
                events[colIdx].map((ev, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-0.5
                               bg-teal-50 text-teal-900 rounded-lg px-1.5 py-1
                               ring-1 ring-inset ring-teal-200"
                  >
                    <span className="text-[11px] font-medium tracking-wide">
                      {ev.time}
                    </span>
                    <span className="text-[11px] leading-tight">
                      {ev.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
  
}
