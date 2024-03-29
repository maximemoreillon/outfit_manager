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

dotenv.config()

const { APP_PORT = 80, IDENTIFICATION_URL } = process.env

const auth_options = { url: IDENTIFICATION_URL }

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
    auth: auth_options,
    uploads_directory,
  })
})

// Reqauire authentication for all routes hereafter
app.use(auth(auth_options))
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
  console.log(`Outfit manager API v${version} listening on port ${APP_PORT}`)
})
