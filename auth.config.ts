import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { verifyPassword } from '@/services/auth'
import type { NextAuthOptions } from 'next-auth'

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        // Überprüfe, ob der Benutzer existiert und ob das Passwort korrekt ist
        if (!user || !user.password) return null

        const valid = await verifyPassword(credentials.password, user.password)
        if (!valid) return null

        return user // Stelle sicher, dass der vollständige User zurückgegeben wird
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id // Füge die Benutzer-ID hinzu
        token.role = user.role // Stelle sicher, dass die Rolle vorhanden ist
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string // Setze die Benutzer-ID in die Session
        session.user.role = token.role as string // Setze die Rolle in die Session
      }
      return session
    },
  }
}
