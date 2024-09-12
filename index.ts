import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import cors from "cors"
import dotenv from "dotenv"
import { author, name as application_name, version } from "./package.json"
import {
  connect as dbConnect,
  redactedConnectionString as mongodbConnectionString,
  get_connected as mongodb_connected,
} from "./db"
import outfit_router from "./routes/outfits"
import garment_router from "./routes/garments"
import auth from "@moreillon/express_identification_middleware"
import { uploads_directory } from "./config"
import { userInfoMiddleware } from "@moreillon/express-oidc"
dotenv.config()

const {
  APP_PORT = 80,
  IDENTIFICATION_URL,
  OIDC_ISSUER,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
} = process.env

dbConnect()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send({
    application_name,
    author,
    version,
    mongodb: {
      connection_string: mongodbConnectionString,
      connected: mongodb_connected(),
    },
    uploads_directory,
    auth: {},
  })
})

// Require authentication for all routes hereafter
if (OIDC_ISSUER) {
  console.log(`Using OIDC authentication with authority ${OIDC_ISSUER}`)
  app.use(
    userInfoMiddleware({
      authority: OIDC_ISSUER,
      client_id: OIDC_CLIENT_ID,
      client_secret: OIDC_CLIENT_SECRET,
    })
  )
} else if (IDENTIFICATION_URL) {
  console.log(`Using Legacy authentication with url ${IDENTIFICATION_URL}`)
  app.use(auth({ url: IDENTIFICATION_URL }))
}

app.use("/outfits", outfit_router)
app.use("/garments", garment_router)

// Express error handling

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  let { statusCode = 500, message = error } = error
  if (isNaN(statusCode) || statusCode > 600) statusCode = 500
  res.status(statusCode).send(message)
})

app.listen(APP_PORT, () => {
  console.log(`[Express] listening on port ${APP_PORT}`)
})
