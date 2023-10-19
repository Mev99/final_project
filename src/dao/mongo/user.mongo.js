import userModel from "./models/user.model.js";

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

    put = async() => {
        let updateUser = await userModel.updateOne()
        return updateUser
    }

    delete = async() => {
        let deleteUser = await userModel.deleteOne()
        return deleteUser
    }
}