"use server"
import { hashPassword, response } from "@/lib/utils";
import { registerSchema } from "@/schemas";
import { createUser, getUserByEmail } from "@/services/user";
import { z } from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
    console.log("Registering user with values:", values);

    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
        console.log("Validation failed:", validatedFields.error);
        return response({
            success: false,
            error: {
                code: 422,
                message: "Invalid fields."
            }
        });
    }

    const { email, firstname, lastname, password } = validatedFields.data;

    const existUser = await getUserByEmail(email);
    if (existUser) {
        console.log("User already exists with email:", email);
        return response({
            success: false,
            error: {
                code: 422,
                message: "Email already exists"
            }
        });
    }

    const hashedPassword = await hashPassword(password);
    console.log("Hashed password:", hashedPassword);

    const user = await createUser({ email, firstname, lastname, password: hashedPassword });

    if (user) {
        console.log("User created successfully:", user);
        return response({
            success: true,
            code: 201,
            message: "Registration successful!"
        });
    }

    console.log("User creation failed for:", email);
    return response({
        success: false,
        error: {
            code: 401,
            message: `User not created. ${email}, ${firstname}, ${lastname}, ${hashedPassword}`
        }
    });
}