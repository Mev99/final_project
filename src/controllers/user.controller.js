import { userService } from "../repository/app.js"
import UserDto from "../dao/DTOs/user.dto.js"

// *LOGIN
async function getLogin(req, res) {
    try {
        res.render('login')
    } catch (error) {
        console.error(error)
    }
}

// ! NOT BEING USED BECAUSE OF PASSPORT REDIRECT
// async function postLogin(req, res) {
//     try {
//         if (!req.session.passport.user) {
//             console.log('user', req.session.passport.user)
//             return res.status(400).send("User not found")
//         }

//         req.session.user = {
//             first_name: req.user.first_name,
//             last_name: req.user.last_name,
//             email: req.user.email,
//             age: req.user.age,
//             role: req.user.role
//         }

//         res.send({status: 'success', payload: req.session.user})
//     } catch (error) {
//         console.error(error)
//     }
// }

// *REGISTER
async function getRegister(req, res) {
    try {
        res.render('register')
    } catch (error) {
        console.error(error)
    }
}

// ! NOT BEING USED BECAUSE OF PASSPORT REDIRECT
// async function postRegister(req, res) {
//     try {
//         const { first_name, last_name, email, age, password } = req.body
//         console.log(_id)

//         if (!first_name || !last_name || !email || !age || !password) {
//             return res.status(400).send('missing information');
//         }

//         // res.write({payload: createUser})
//         res.send({ status: 'success', payload: _id});
//     } catch (error) {
//         console.error(error)
//     }
// }

// *USER
async function getAllUsers(req, res) {
    try {
        let users = await userService.get()
        res.send({ result: 'success', payload: users })
    } catch (error) {
        console.error(error)
    }
}

async function getUser(req, res) {
    try {
        let paramId = req.params.uid
        let searchById = await userService.getById(paramId)
        res.send({ payload: searchById })
    } catch (error) {
        console.error(error)
    }
}

async function putUser(req, res) {
    try {
        let userId = req.params.uid
        let newUserInfo = req.body

        let update = await userService.put(userId, newUserInfo)
        res.send({ result: "success on updating", payload: update })
    } catch (error) {
        console.error(error)
    }
}

async function deleteUser(req, res) {
    try {
        let userId = req.params.uid
        let deleteUser = await userService.delete(userId)

        res.send({ result: "success", message: `deleted user with the following ID: ${userId}`, payload: deleteUser })
    } catch (error) {
        console.error(error)
    }
}

async function getCurrent(req, res) {
    try {
        const userDTO = new UserDto(req.user)
        res.render('current', userDTO)
    } catch (error) {
        console.error(error)
    }
}

// * CHANGE ROLE FROM USER -> PREMIUM || PREMIUM -> USER
async function changeRole(req, res) {
    try {
        const { uid } = req.params
        const user = await userService.getById(uid)
        if (user.role === user) {
            const test = await userService.put(uid, {role: premium})
            return res.send({test})
        }
        
        if (user.role === premium) {
            const test2 = await userService.put(uid, {role: user})
            return res.send({test2})
        }

        if (user.role === admin) {
            return res.send("that's an admin")
        }
    } catch (error) {
        console.error(error)
    }
}

export default {
    getAllUsers,
    getUser,
    putUser,
    deleteUser,
    getCurrent,

    getLogin,
    // postLogin,
    
    getRegister,
    // postRegister,

    changeRole
}