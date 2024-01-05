import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const {
  MONGODB_CONNECTION_STRING,
  MONGODB_PROTOCOL = "mongodb",
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST = "localhost",
  MONGODB_PORT,
  MONGODB_DB = "outfit_manager",
  MONGODB_OPTIONS = "",
} = process.env

const mongodbPort = MONGODB_PORT ? `:${MONGODB_PORT}` : ""

const connectionString =
  MONGODB_CONNECTION_STRING ||
  (MONGODB_USERNAME && MONGODB_PASSWORD
    ? `${MONGODB_PROTOCOL}://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}${mongodbPort}/${MONGODB_DB}${MONGODB_OPTIONS}`
    : `${MONGODB_PROTOCOL}://${MONGODB_HOST}${mongodbPort}/${MONGODB_DB}${MONGODB_OPTIONS}`)

export const redactedConnectionString = connectionString.replace(
  /:.*@/,
  "://***:***@"
)

export const connect = () => {
  console.log(`[Mongoose] Connecting to ${redactedConnectionString}`)
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("[Mongoose] Initial connection successful")
    })
    .catch((error) => {
      console.log("[Mongoose] Initial connection failed")
      setTimeout(connect, 5000)
    })
}

const db = mongoose.connection
db.on("error", () => {
  console.log("[Mongoose] Connection lost")
})
db.once("open", () => {
  console.log("[Mongoose] Connection established")
})

export const get_connected = () => mongoose.connection.readyState
