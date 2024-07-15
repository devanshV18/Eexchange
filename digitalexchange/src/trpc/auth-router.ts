import { AuthCredentialValidatior } from "../lib/validators/account-credentials-validators"
import { publicProcedure, router } from "./trpc"
import { getPayloadClient } from "../get-payload"
import { TRPCError } from "@trpc/server"


export const authRouter = router({
    createPayloadUser: publicProcedure.input(AuthCredentialValidatior)
    .mutation(async ({input}) => {
        const {email, password} = input
        const paylaod = await getPayloadClient()

        //checking if user already exists
        const {docs: users} = await paylaod.find({
            collection: "users",
            where: {
                email: {
                    equals: email
                }
            }
        })

        //user already exist with entered email : -
        if(users.length !== 0){
            throw new TRPCError({ code: 'CONFLICT' })
        }

        //no user with current email
        await paylaod.create({
            collection: 'users',
            data: {
                email,
                password,
                role: 'user'
            }
        })

        return {success:true, sentToEmail:email}
    })
})