import { db } from "@/lib/db"
import { registerSchema } from "@/schemas";
import { User } from "@prisma/client";
import { z } from "zod";

export const getUserByEmail = async (email: string) => {
    try {
        return await db.user.findUnique({ where: { email } });
    } catch (error) {
        console.error("Fehler beim Abrufen des Benutzers:", error);
        return null;
    }
};

export const getUserById = async (id: number) =>{
    try{
        const user = await db.user.findUnique({where: {id}});
        return user;
    }catch{
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
