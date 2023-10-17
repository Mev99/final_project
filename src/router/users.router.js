import { Router } from "express";
import userModel from "../models/user.model.js";
const userRouter = Router()

userRouter.get('/', async (req, res) => {
    try {
        let users = await userModel.find()

        res.send({ result: 'success', payload: users })
    } catch (error) {
        console.error('error on user get', error)
    }
})

userRouter.get('/:uid', async (req, res) => {
    try {
        let paramId = req.params
        let searchById = await userModel.find({ userId: paramId.uid })
        res.send({ payload: searchById })

    } catch (error) {
        console.error(error)
    }
})

userRouter.post('/', async (req, res) => {
    try {
        let { name, email, userId } = req.body

        let information = [{ name, email, userId }]

        let result = await userModel.create(information)

        res.send({ result: "success", payload: result })
    } catch (error) {
        console.error('error on user post', error)
    }
})

userRouter.put("/:uid", async (req, res) => {
    try {
        let paramId = req.params
        const findDocument = await userModel.findOne({ userId: paramId.uid })

        if (findDocument === null) {
            return res.send("user's ID not found")
        }

        let newUserInfo = req.body
        let update = await findDocument.updateOne(newUserInfo)

        res.send({ result: "success on updating", payload: update })
    } catch (error) {
        console.error("error on the user put", error)
    }
})

userRouter.delete("/:uid", async (req, res) => {
    try {
        let paramId = req.params
        let deleteUser = await userModel.deleteOne({ userId: paramId.uid })

        res.send({ result: "success", message: `deleted user with the following ID: ${paramId.uid}`, payload: deleteUser })
    } catch (error) {
        console.error("error on the user delete", error)
    }
})

export default userRouter