import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const { MONGODB_DB = "outfit_manager", MONGODB_URL = "mongodb://mongo" } =
  process.env



let mongodb_connected = false

const mongoose_connect = () => {
  console.log("[MongoDB] Attempting connection...")
  const connection_url = `${MONGODB_URL}/${MONGODB_DB}`
  mongoose
    .connect(connection_url)
    .then(() => {
      console.log("[Mongoose] Initial connection successful")
    })
    .catch((error) => {
      console.log("[Mongoose] Initial connection failed")
      setTimeout(mongoose_connect, 5000)
    })
}

// Not ideal here
mongoose_connect()

const db = mongoose.connection
db.on("error", () => {
  console.log("[Mongoose] Connection lost")
  mongodb_connected = false
})
db.once("open", () => {
  console.log("[Mongoose] Connection established")
  mongodb_connected = true
})


export const get_connected = () => mongodb_connected
