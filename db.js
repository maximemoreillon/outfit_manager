const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const { MONGODB_DB = "outfit_manager", MONGODB_URL = "mongodb://mongo" } =
  process.env

const mongodb_options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let mongodb_connected = false

const mongoose_connect = () => {
  console.log("[MongoDB] Attempting connection...")
  const connection_url = `${MONGODB_URL}/${MONGODB_DB}`
  mongoose
    .connect(connection_url, mongodb_options)
    .then(() => {
      console.log("[Mongoose] Initial connection successful")
    })
    .catch((error) => {
      console.log("[Mongoose] Initial connection failed")
      setTimeout(mongoose_connect, 5000)
    })
}

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

exports.url = MONGODB_URL
exports.db = MONGODB_DB
exports.get_connected = () => mongodb_connected
