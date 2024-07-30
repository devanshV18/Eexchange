//in this file basically we are creating a data base client using payload that we can use it in the entire application and moreover we also cached it.

import dotenv from "dotenv"
import path from "path"
import type { InitOptions } from "payload/config"
import payload, {Payload} from "payload"
import nodemailer from "nodemailer"

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY
    }
})

let cached = (global as any).payload

if(!cached) {
    cached = (global as any).payload = {
        client: null,
        promise: null
    }
}

interface Args{
    initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({
    initOptions,
}: Args = {}): Promise<Payload> => {
    if(!process.env.PAYLOAD_SECRET){
        throw new Error('Payload Secret is Missing')
    }

    if(cached.client){
        return cached.client
    }

    if(!cached.promise){
        cached.promise = payload.init({
            email: {
                transport: transporter,
                fromAddress: "onboarding@resend.dev",
                fromName: "DigitalHippo"
            },
            secret: process.env.PAYLOAD_SECRET,
            local: initOptions?.express ? false : true,
            ...(initOptions || {})
        })
    }

    try {
        cached.client = await cached.promise
    } catch (err: unknown) {
        cached.promise = null
        throw err
    }

    return cached.client
}
