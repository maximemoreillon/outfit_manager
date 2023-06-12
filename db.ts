import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const { MONGODB_DB = "outfit_manager", MONGODB_URL = "mongodb://mongo" } =
  process.env



export const connect = () => {
  console.log("[MongoDB] Attempting connection...")
  const connection_url = `${MONGODB_URL}/${MONGODB_DB}`
  mongoose
    .connect(connection_url)
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
