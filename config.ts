import path from "path"

export const {
  UPLOADS_DIRECTORY = "uploads",
  APP_PORT = 80,
  IDENTIFICATION_URL,
  OIDC_JWKS_URI,
} = process.env

export const uploads_directory = path.resolve(UPLOADS_DIRECTORY)
