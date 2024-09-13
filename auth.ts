import { NextFunction, Request, Response } from "express"
import { userInfoMiddleware } from "@moreillon/express-oidc"
import legacyAuthMiddleware from "@moreillon/express_identification_middleware"

import {
  IDENTIFICATION_URL,
  OIDC_AUTHORITY,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
} from "./config"

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

  authMiddleware = userInfoMiddleware({
    authority: OIDC_AUTHORITY,
    client_id: OIDC_CLIENT_ID,
    client_secret: OIDC_CLIENT_SECRET,
  })
} else if (IDENTIFICATION_URL) {
  console.log(
    `[Auth] Using Legacy authentication with url ${IDENTIFICATION_URL}`
  )
  authMiddleware = legacyAuthMiddleware({ url: IDENTIFICATION_URL })
}
