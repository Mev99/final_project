import crypto from "crypto"

export function generateToken() {
  const token = crypto.randomBytes(20).toString('hex')
  const expirationTime = Date.now() + 3600000
  return { token, expirationTime }
}