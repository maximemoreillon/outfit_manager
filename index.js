const express = require("express")
require("express-async-errors")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const { author, name: application_name, version } = require("./package.json")
const db = require("./db.js")
const outfit_router = require("./routes/outfits.js")
const garment_router = require("./routes/garments.js")
const auth = require("@moreillon/express_identification_middleware")
const { uploads_directory } = require("./config.js")

dotenv.config()

const { APP_PORT = 80, IDENTIFICATION_URL } = process.env

const auth_options = { url: IDENTIFICATION_URL }

// Express configuration
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send({
    application_name,
    author,
    version,
    mongodb: {
      url: db.url,
      db: db.db,
      connected: db.get_connected(),
    },
    auth: auth_options,
    uploads_directory,
  })
})

app.use("/outfits", auth(auth_options), outfit_router)
app.use("/garments", auth(auth_options), garment_router)

// Express error handling

app.use((error, req, res, next) => {
  console.error(error)
  let { statusCode = 500, message = error } = error
  if (isNaN(statusCode) || statusCode > 600) statusCode = 500
  res.status(statusCode).send(message)
})

// Start server
app.listen(APP_PORT, () => {
  console.log(`Outfit manager API v${version} listening on port ${APP_PORT}`)
})
