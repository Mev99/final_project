import { userService } from "../repository/app.js"

// * IF NOT ADMIN = 403
async function authorizationAdmin(req, res, next) {
    try {
        if (req.user.role === 'user') {
            return res.status(403).render('forbidden')
        }
        next()
    } catch (error) {
        console.error(error)
    }
}

// * IF NOT USER = 403 
async function authorizationUser(req, res, next) {
    try {
        if (req.user.role === 'admin') {
            console.log(req.user.role)
            return res.status(403).render('forbidden')
        }
        next()
    } catch (error) {
        console.error(error)
    }
}

// * CHECK IF USER IS AUTHENTICATED
async function checkAuthenticated(req, res, next) {
    try {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/user/login')
    } catch (error) {
        console.error(error)
    }
}

// * IF AUTHENTICATED REDIRECTS TO USER'S PROFILE
async function checkNotAuthenticated(req, res, next) {
    try {
        if (req.isAuthenticated()) {
            res.redirect('/user/current')
        }
        return next()
    } catch (error) {
        console.log(error)
    }
}

export async function verifyToken(req, res, next) {
    const queryToken = req.params.token
    const userTokenData = await userService.getByToken(queryToken)
    const token = userTokenData.restoreToken.token
    const expirationTime = userTokenData.restoreToken.expirationTime

    if (queryToken === token && expirationTime > Date.now()) {
        return next()
    } else {
        return res.render('forbidden')

    }
}

export default {
    authorizationAdmin,
    authorizationUser,
    checkAuthenticated,
    checkNotAuthenticated,
    verifyToken
}