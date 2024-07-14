import {z} from "zod"

export const AuthCredentialValidatior = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message: "Password must contain atleast 8 characters"}),
})

export type TAuthCredentialsValidator =  z.infer<typeof AuthCredentialValidatior>