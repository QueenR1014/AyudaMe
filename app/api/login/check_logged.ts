import { cookies } from "next/headers";

export async function isUserLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies(); 
  const sessionCookie = cookieStore.get('session');

  if (sessionCookie?.value) {
    try {
      const sessionData = JSON.parse(sessionCookie.value);
      return !!sessionData.userId; // return true if userId exists
    } catch (error) {
      return false; // malformed JSON
    }
  }

  return false; // no cookie
}
