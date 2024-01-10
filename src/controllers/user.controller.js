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

async function logout(req, res) {

}

async function getAllUsers(req, res) {
    try {
        const users = await userService.get()
        const filteredUserData = users.map(user => new UserDto(user))

        res.send({ result: 'success', payload: filteredUserData })
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

async function deleteLastSeen(req, res) {
    try {
        const users = await userService.get()
        const currentDate = new Date()

        const inactiveUsers = users.filter(user => {
            const lastSeenDate = new Date(user.last_seen)
            const timeDifference = (currentDate - lastSeenDate) / (1000 * 60)

            return timeDifference >= 30
        })


        let deletedUsers = []

        inactiveUsers.forEach(user => {
            userService.delete(user._id)
            deletedUsers.push(user._id)
        })

        res.send({ result: "inactive users deleted", deletedUsers })
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

        if (user[0].role === "user") {
            if (user[0].documents.length >= 3) {
                const changeToPremium = await userService.put(uid, { role: "premium" })
                return res.send({ changeToPremium })
            } else {
                return res.send({ error: 'in order to become a premium member you have to upload the files containing your information' })
            }

        }

        if (user[0].role === "premium") {
            const changeToUser = await userService.put(uid, { role: "user" })
            return res.send({ changeToUser })
        }

        if (user[0].role === "admin") {
            return res.send({ nope: "that's an admin" })
        }

        res.send({ error: "user's role isn't user, premium nor admin" })
    } catch (error) {
        console.error(error)
    }
}

// * UPLOAD DOCUMENT
async function uploadDocument(req, res) {
    try {
        const path = req.file.path
        const fileName = req.file.originalname
        if (!req.file) return res.status(400).send({ status: 'error', error: 'file not uploaded' })

        const user = await userService.getById(req.user._id)
        if (!user) return res.status(404).send({ status: 'error', error: 'user no found' })

        const documents = user[0].documents
        documents.push({ name: fileName, reference: path })

        const result = await userService.put(req.user._id, { documents })
        if (!result) return res.status(400).send({ status: 'error', error: 'file not uploaded' })

        res.send({ status: 'file uploaded', payload: req.file })
    } catch (error) {
        console.error(error)
    }
}

export default {
    getAllUsers,
    getUser,
    putUser,
    deleteUser,
    deleteLastSeen,
    getCurrent,

    getLogin,
    // postLogin,

    logout,

    getRegister,
    // postRegister,

    changeRole,

    uploadDocument
}