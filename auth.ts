import { NextFunction, Request, Response } from "express"
import legacyAuthMiddleware from "@moreillon/express_identification_middleware"
import oidcMiddleware from "@moreillon/express-oidc"
import { IDENTIFICATION_URL, OIDC_JWKS_URI } from "./config"

export let authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next()
}

if (OIDC_JWKS_URI) {
  console.log(`[Auth] Using OIDC authentication with JWKS URI ${OIDC_JWKS_URI}`)

  authMiddleware = oidcMiddleware({ jwksUri: OIDC_JWKS_URI })
} else if (IDENTIFICATION_URL) {
  console.log(
    `[Auth] Using Legacy authentication with url ${IDENTIFICATION_URL}`
  )
  authMiddleware = legacyAuthMiddleware({ url: IDENTIFICATION_URL })
}

export const getUserId = (req: Request, res: Response) => {
  const user: any = res.locals.user ?? req.user
  return user._id ?? user.legacy_id ?? user.sub
}
