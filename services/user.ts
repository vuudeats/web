import { db } from "@/lib/db"
import { registerSchema } from "@/schemas";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { z } from "zod";

export const getUserByEmail = async (email: string) => {
    try {
        return await db.user.findUnique({ where: { email } });
    } catch (error) {
        console.error("Fehler beim Abrufen des Benutzers:", error);
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        return await db.user.findUnique({ where: { id } });
    } catch (error) {
        console.error("Fehler beim Abrufen des Benutzers:", error)
        return null;
    }
}

export const createUser = async ({ email, firstname, lastname, password }: z.infer<typeof registerSchema>) => {
    try {
        return await db.user.create({
            data: {
                email,
                firstname,
                lastname,
                password, // Hier sicherstellen, dass es bereits gehasht ist!
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
};

export const getUserRoleById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user?.role;
    }
    catch {
        return null;
    }
}

export async function getCurrentUser() {
    const token = await getToken({ req: { cookies } as any })
    console.log("TOKEN:", token) // Debug
  
    if (!token?.email) return null
  
    // Optional: hole User aus DB
    return await db.user.findUnique({
      where: { email: token.email },
    })
  }