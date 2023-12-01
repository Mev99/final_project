import UserDto from '../dao/DTOs/user.dto.js'

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async () => {
        try {
            let result = await this.dao.get()
            return result
        } catch (error) {
            console.error(error)
        }
    }

    getById = async (userId) => {
        try {
            let result = await this.dao.getById(userId)
            return result
        } catch (error) {
            console.error(error)
        }
    }

    put = async (userId, newUserInfo) => {
        try {
            let result = await this.dao.put(userId, newUserInfo)
            return result
        } catch (error) {
            console.error(error)
        }
    }

    delete = async (userId) => {
        try {
            let result = await this.dao.delete(userId)
            return result
        } catch (error) {
            console.error(error)
        }
    }
}