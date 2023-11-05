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

export default {
    authorizationAdmin,
    authorizationUser,
    checkAuthenticated,
    checkNotAuthenticated
}