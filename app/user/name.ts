import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function getUserName(): Promise<string> {
  // Get the cookies
  const cookieStore = await cookies();
  const CS = cookies();
  const sessionCookie = cookieStore.get('session');

  // If no session cookie, return empty string or handle accordingly
  if (!sessionCookie) {
    return '';
  }

  // Parse the session cookie value (e.g. { userId: 1 })
  let userId: number;
  try {
    const session = JSON.parse(sessionCookie.value);
    userId = session.userId;
  } catch (err) {
    console.error('Invalid session cookie:', err);
    return '';
  }

  // Create the Supabase client
  const supabase = await createClient(CS);

  // Fetch the user by ID
  const { data, error } = await supabase
    .from('User')
    .select('username')
    .eq('id', userId)
    .single();

  if (error || !data) {
    console.error('Error fetching user:', error?.message);
    return '';
  }

  return data.username;
}
