import { restorePassService } from "../repository/app.js"
import { productService } from "../repository/app.js"

// * IF NOT ADMIN = 403
async function authorizationAdmin(req, res, next) {
    try {
        if (req.user.role === 'user' || req.user.role === 'premium') {
            return res.status(403).render('forbidden')
        }
        next()
    } catch (error) {
        console.error(error)
    }
}

async function authorizationAdminAndPremium(req, res, next) {
    try {
        if (req.user.role === 'user') {
            return res.status(403).render('forbidden')
        }
        if (req.user.role === 'admin' || req.user.role === 'premium') {
            req.isPremium = req.user.role === 'premium'
            return next()
        }

    } catch (error) {
        console.error(error)
    }
}

// * IF NOT USER = 403 
async function authorizationUser(req, res, next) {
    try {
        if (req.user.role === 'admin') {
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

// * VERIFIES EXPIRATION DATE OF THE TOKEN
export async function verifyToken(req, res, next) {
    const queryToken = req.params.token
    const userTokenData = await restorePassService.getByToken(queryToken)
    const token = userTokenData.restoreToken.token
    const expirationTime = userTokenData.restoreToken.expirationTime

    if (queryToken === token && expirationTime > Date.now()) {
        return next()
    } else {
        return res.render('forbidden')

    }
}

// * CHECKS IF PREMIUM USER ADDS HIS OWN ITEM TO CART
async function checkPremiumAddToCart(req, res, next) {
    try {
        const { role, _id } = req.user
        if (role === "premium") {
            const { pid } = req.params
            const product = await productService.getById(pid)
            if (product.owner === _id) {
                return res.send('cannot add your own product to the cart')
            }
        }
        next()
    } catch (error) {
        console.error(error)
    }
}

export default {
    authorizationAdmin,
    authorizationAdminAndPremium,
    authorizationUser,
    checkAuthenticated,
    checkNotAuthenticated,
    verifyToken,
    checkPremiumAddToCart
}