import { AuthCredentialValidatior } from "../lib/validators/account-credentials-validators"
import { publicProcedure, router } from "./trpc"
import { getPayloadClient } from "../get-payload"
import { TRPCError } from "@trpc/server"
import z from "zod"


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
    }),

    verifyEmail: publicProcedure
    .input(z.object({token: z.string()}))
    .query(async ({input}) => {
        const {token} = input

        const payload = await getPayloadClient()
        const isVerified = await payload.verifyEmail({
            collection: "users",
            token
        })

        if(!isVerified){
            throw new TRPCError({code: 'UNAUTHORIZED'})
        }

        return {success: true}

    }),

    signIn: publicProcedure.input(AuthCredentialValidatior).mutation(async ({input, ctx}) => {
        const {email, password} = input
        const {res} = ctx

        const paylaod = await getPayloadClient()

        try{
            await paylaod.login({
                collection: 'users',
                data: {
                    email,
                    password,
                },
                res,
            })
            return {success:true}
        }catch(err){
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }
    })
})