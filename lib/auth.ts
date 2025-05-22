import { auth } from "@/auth.config"

export async function isAdmin() {
  const session = await auth()
  return session?.user?.role === 'ADMIN'
}