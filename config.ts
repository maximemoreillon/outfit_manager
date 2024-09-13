import path from "path"

export const {
  UPLOADS_DIRECTORY = "uploads",
  APP_PORT = 80,
  IDENTIFICATION_URL,
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID = "",
  OIDC_CLIENT_SECRET = "",
} = process.env

export const uploads_directory = path.resolve(UPLOADS_DIRECTORY)
