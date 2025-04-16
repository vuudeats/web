import { response } from "@/lib/utils";
import { adminLoginSchema } from "@/schemas";
import { getUserRoleById } from "@/services/user";
import { z } from "zod";

export const login = async (values: z.infer<typeof adminLoginSchema>)=>{
    const validatedFields = adminLoginSchema.safeParse(values);
    if(!validatedFields.success) return response({
        success: false,
        error:{
            code: 422,
            message: "Invalid fields."
        }
    })

    const {uuid} = validatedFields.data;

    const userRole = await getUserRoleById(uuid);
    if( !userRole ) return response({
        success: false,
        error:{ 
            code: 401,
            message: "Invalid admin login data."
        } 
    })
    return response({
        success: true,
        code: 201,
        message: "Admin login successful!"
    })
}