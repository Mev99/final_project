import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidatePassword = (user, password) => bcrypt.compareSync(password, user.password)

export { createHash, isValidatePassword }