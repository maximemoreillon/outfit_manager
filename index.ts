import dotenv from "dotenv"
dotenv.config()
import { author, name as application_name, version } from "./package.json"

console.log(`Outfit manager v${version}`)

import express, { NextFunction, Request, Response } from "express"
import "express-async-errors"
import cors from "cors"
import {
  connect as dbConnect,
  redactedConnectionString as mongodbConnectionString,
  get_connected as mongodb_connected,
} from "./db"
import outfit_router from "./routes/outfits"
import garment_router from "./routes/garments"
import { uploads_directory } from "./config"
import { authMiddleware } from "./auth"

import { APP_PORT } from "./config"

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
  })
})

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
