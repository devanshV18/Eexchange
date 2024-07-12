import express from "express"
//we can import this gePyloadclient function anywhere to get data base access
import { getPayloadClient } from "./get-payload"

const app = express()
const PORT = Number(process.env.PORT) || 3000

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async(cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`)
            }
        }
    })
}

start()