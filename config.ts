import dotenv from "dotenv"
import path from "path"

dotenv.config()

const { UPLOADS_DIRECTORY = "uploads" } = process.env

export const uploads_directory = path.resolve(UPLOADS_DIRECTORY)
