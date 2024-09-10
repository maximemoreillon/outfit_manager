import { type NextFunction, type Request, type Response } from "express"
import { BaseClient, Issuer } from "openid-client"

export const {
  OIDC_ISSUER = "",
  OIDC_CLIENT_SECRET = "",
  OIDC_CLIENT_ID = "",
} = process.env

let issuer: Issuer<BaseClient>
let client: BaseClient

const getClient = () => client

if (OIDC_ISSUER) {
  Issuer.discover(OIDC_ISSUER).then((iss) => {
    issuer = iss
    client = new issuer.Client({
      client_id: OIDC_CLIENT_ID,
      client_secret: OIDC_CLIENT_SECRET, // Necessary for introspect
    })
  })
}

// https://www.npmjs.com/package/openid-client/v/2.4.3#manually-recommended
/* 
> You should provide at least the following metadata: 
  - client_id, 
  - client_secret, 
  - id_token_signed_response_alg (defaults to RS256) 
  - token_endpoint_auth_method (defaults to client_secret_basic) 
  for a basic client definition, but you may provide any IANA registered client metadata.
*/
// Note: for the userInfo method, client_secret is not needed
// This probably implies that the token is not verified
// export const client = new issuer.Client({
//   client_id: OIDCCLIENT_ID,
//   client_secret: OIDCCLIENT_SECRET, // Necessary for introspect
// })

export const userInfoMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    (req.query.jwt as string | undefined) ??
    (req.query.token as string | undefined) ??
    req.headers.authorization?.split(" ")[1]

  if (!token || token === "undefined") {
    return res.status(401).send("Missing token")
  }

  try {
    const userInfo = await getClient().userinfo(token)
    res.locals.user = userInfo
  } catch (error) {}

  next()
}
