import User from "../dao/classes/user.mongo.js"

const userService = new User()
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

export default {
    getAllUsers,
    getUser,
    putUser,
    deleteUser
}