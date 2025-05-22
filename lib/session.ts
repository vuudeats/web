import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const key = new TextEncoder().encode(process.env.SECRET)

type SessionPayload = {
  userId: number
  expiresAt: Date
}
export const encrypt = (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS265" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key)
}

export const createSession = async (userId: number) => {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt })

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt
  });
}