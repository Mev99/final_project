import User from "../dao/mongo/user.mongo.js"

const userMongo = new User()
async function getAllUsers(req, res) {
    try {
        let users =  await userMongo.get()
        res.send({ result: 'success', payload: users })
    } catch (error) {
        console.error(error)
    }
}

async function getUser(req, res) {
    try {
        let paramId = req.params.uid
        let searchById = await userMongo.getById(paramId)
        res.send({ payload: searchById })
    } catch (error) {
        console.error(error)
    }
}

async function putUser(req, res) {
    try {
        let paramId = req.params
        const findDocument = await User.get({ userId: paramId.uid })
//findOne
        if (findDocument === null) {
            return res.send("user's ID not found")
        }

        let newUserInfo = req.body
        let update = await findDocument.updateOne(newUserInfo)

        res.send({ result: "success on updating", payload: update })
    } catch (error) {
        console.error(error)
    }
}

async function deleteUser(req, res) {
    try {
        let paramId = req.params
        let deleteUser = await userModel.deleteOne({ userId: paramId.uid })

        res.send({ result: "success", message: `deleted user with the following ID: ${paramId.uid}`, payload: deleteUser })
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