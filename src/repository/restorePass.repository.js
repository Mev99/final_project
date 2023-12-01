export default class RestorePassRepository {
    constructor (dao) {
        this.dao = dao
    }

    getByToken = async (userToken) => {
        try {
            let token = await this.dao.getByToken(userToken)
            return token
        } catch (error) {
            console.error(error)
        }
    }

}