const dotenv = require("dotenv")
const path = require("path")

dotenv.config()

const { UPLOADS_DIRECTORY = "uploads" } = process.env

exports.uploads_directory = path.resolve(UPLOADS_DIRECTORY)
