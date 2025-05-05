import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

interface Medicina {
  id: number;
  nombre: string;
  principio_activo: string;
  dosis: string;
  id_user: number; // User ID associated with the medicine
}

interface Posologia {
  id: number;
  user_id: number;
  medicamento_id: number;
  frequency: 'daily' | 'days' | 'interval';
  selected_days: number[];
  interval_days: number;
  times_per_day: number;
  hours: string[];
}

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  // Extracting data from request body
  const {
    nombre,
    principio_activo,
    dosis,
    user_id,
    frequency,
    selectedDays,
    intervalDays,
    timesPerDay,
    hours,
  } = await req.json();

  // Insert medicine first
  const { data: medicineData, error: medicineError } = await supabase
    .from('medicamento') // No need to specify row type here; we'll handle it dynamically
    .insert([{ nombre, principio_activo, dosis, id_user: user_id }])
    .single();  // Insert one entry and get the data back

  if (medicineError) {
    return new Response(JSON.stringify({ message: 'Error al guardar medicina' }), { status: 500 });
  }

  // Insert posologia based on the data
  const { data: posologiaData, error: posologiaError } = await supabase
    .from('posologia') // Same as above, no need for specific types
    .insert([{
      user_id,
      medicamento_id: medicineData.id,  // Use the id from the inserted medicine
      frequency,
      selected_days: selectedDays,
      interval_days: intervalDays,
      times_per_day: timesPerDay,
      hours
    }]);

  if (posologiaError) {
    return new Response(JSON.stringify({ message: 'Error al guardar posología' }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Medicina y posología guardadas exitosamente' }), { status: 200 });
}
