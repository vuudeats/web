import { response } from "@/lib/utils";
import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>)=>{
    const validatedFields = loginSchema.safeParse(values);
    if(!validatedFields.success) return response({
        success: false,
        error:{
            code: 422,
            message: "Invalid fields."
        }
    })

    const {email, password} = validatedFields.data;

    const userExist = await getUserByEmail(email);
    if(!userExist || !userExist.email || !userExist.password ) return response({
        success: false,
        error:{ 
            code: 401,
            message: "Invalid login data."
        } 
    })

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password); 
    if(!isPasswordCorrect) return response({
        success: false,
        error:{
            code: 401,
            message: "Invalid password."
        }
    })
    
}