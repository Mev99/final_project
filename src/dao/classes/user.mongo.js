import userModel from "../models/user.model.js";

export default class User {

    get = async () => {
        try {
            let user = await userModel.find()
            return user

        } catch (error) {
            console.error(error)
        }
    }

    getById = async (userId) => {
        try {
            let user = await userModel.find({ _id: userId })
            return user

        } catch (error) {
            console.error(error)
        }
    }

    put = async (userId, newUserInfo) => {
        let findUser = await userModel.find({ _id: userId })
        if (findUser === null) {
            return res.send("user's ID not found")
        }

        let updateUser = await findUser.updateOne(newUserInfo)
        return updateUser
    }

    delete = async (userId) => {
        let deleteUser = await userModel.deleteOne({ _id: userId })
        return deleteUser
    }
}