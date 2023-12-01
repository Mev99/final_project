import userModel from "../models/user.model.js";

export default class RestorePass {
    
    getByToken = async (userToken) => {
        try {
            let token = await userModel.findOne({'restoreToken.token': userToken}, 'restoreToken')
            return token
        } catch (error) {
            console.error(error)
        }
    }

}