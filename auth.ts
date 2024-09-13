import { NextFunction, Request, Response } from "express"
import legacyAuthMiddleware from "@moreillon/express_identification_middleware"
import passport from "passport"
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt"
import { passportJwtSecret } from "jwks-rsa"
import { IDENTIFICATION_URL, OIDC_AUTHORITY } from "./config"

export let authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next()
}

if (OIDC_AUTHORITY) {
  console.log(
    `[Auth] Using OIDC authentication with authority ${OIDC_AUTHORITY}`
  )

  const verify = (payload: any, done: VerifiedCallback) => {
    done(null, payload)
  }

  const jwksUri = `${OIDC_AUTHORITY}/.well-known/jwks.json`
  const passportJwtSecretOptions = {
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri,
  }
  const options = {
    secretOrKeyProvider: passportJwtSecret(passportJwtSecretOptions),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }

  const strategy = new Strategy(options, verify)
  passport.use(strategy)

  authMiddleware = passport.authenticate("jwt", { session: false })
} else if (IDENTIFICATION_URL) {
  console.log(
    `[Auth] Using Legacy authentication with url ${IDENTIFICATION_URL}`
  )
  authMiddleware = legacyAuthMiddleware({ url: IDENTIFICATION_URL })
}
