import crypto from "crypto"

import { userService } from "../repository/app.js"

export function generateToken() {
  const token = crypto.randomBytes(20).toString('hex')
  const expirationTime = Date.now() + 3600000
  return { token, expirationTime }
}

// export async function verifyToken(tokenData) {
//   // const { token, expirationTime } = tokenData
//   const token = tokenData

//   const userTokenData = await userService.getByToken(token)
//   console.log(userTokenData)

//   console.log(userTokenData.expirationTime)
//   if (expirationTime > Date.now()) {
//     return token
//   } else {
//     return null
//   }
// }
