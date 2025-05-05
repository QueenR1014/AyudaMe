import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json()

  if (!username || !email || !password) {
    return NextResponse.json({ message: 'Faltan campos obligatorios' }, { status: 400 })
  }

  try {
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)

    // Check if user already exists
    const { data: existingUser, error: selectError } = await supabase
      .from('User')
      .select('id')
      .eq('email', email)
      .single()

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116: No rows found — that's OK
      throw selectError
    }

    if (existingUser) {
      return NextResponse.json({ message: 'El correo ya está registrado' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const { error: insertError } = await supabase.from('User').insert({
      username,
      email,
      password: hashedPassword,
      medicamentos: [], // assuming it's a text[] column
    })

    if (insertError) throw insertError

    return NextResponse.json({ message: 'Usuario registrado con éxito' }, { status: 201 })
  } catch (error) {
    console.error('Error en el registro:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
