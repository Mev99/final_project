import { generateToken } from "../config/tokenGenerator.config.js";
import { transport } from "../config/nodemailer.config.js";

import { userService } from "../repository/app.js"
import UserDto from "../dao/DTOs/user.dto.js";


async function sendEmail(req, res, next) {
    try {
        const restoreToken = generateToken()
        const user = new UserDto(req.user)

        const updateToken = await userService.put(user._id, { restoreToken })

        const mailOptions = {
            from: 'matiasayesa99@gmail.com',
            to: `${user.email}`,
            subject: 'Password restore',
            text: `Click the link to reset your password: http://localhost:8080/restore/${restoreToken.token}`
        }

        const send = await transport.sendMail(mailOptions)

        res.render('mailSent')

    } catch (error) {
        console.error(error)
    }
}

async function getRestore(req, res, next) {
    try {
        res.render('restorePassword')
    } catch (error) {
        console.error(error)
    }
}

async function postRestore(req, res, next) {
    try {

    } catch (error) {
        console.error(error)
    }
}

export default {
    sendEmail,
    getRestore,
    postRestore
}