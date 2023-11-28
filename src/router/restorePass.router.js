import { Router } from "express";
// * CONTROLLER
import restorePass from "../controllers/restorePass.controller.js"
// * AUTH MIDDLEWARE
import auth from '../middleware/middleware.js'

const restoreRouter = Router()

restoreRouter.get('/', auth.checkAuthenticated, restorePass.sendEmail)

restoreRouter.get('/:token', auth.checkAuthenticated, auth.verifyToken, restorePass.getRestore)

restoreRouter.post('/:token', auth.checkAuthenticated, restorePass.postRestore)

export default restoreRouter