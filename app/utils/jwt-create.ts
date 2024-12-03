import * as jose from "jose";

export function createJWTToken(payload: Record<string, string>) {
  const alg = "HS256";

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuer(process.env.NEXT_PUBLIC_BASE_URL ?? "")
    .setSubject(payload.username)
    .setIssuedAt()
    .setExpirationTime("6d")
    .sign(secret);
}
