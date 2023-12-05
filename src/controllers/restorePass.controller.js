// *CONFIG
import { generateToken } from "../config/tokenGenerator.config.js";
import { transport } from "../config/nodemailer.config.js";
// *BCRYPT FROM UTILS
import { createHash, isValidatePassword } from "../utils.js";
// *SERVICE & DTO
import { userService } from "../repository/app.js"
import { restorePassService } from "../repository/app.js"
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
        const newPass = createHash(req.body.newPassword)
        const confirmNewPass = req.body.confirmNewPassword
        const validateConfirmPassword = isValidatePassword(newPass, confirmNewPass)
        if (!validateConfirmPassword) {
            return res.send('values are not the same')
        }

        const user = req.user
        const validateOldPassword = isValidatePassword(user.password, confirmNewPass)
        if (validateOldPassword) {
            return res.send('cannot repeat old passwords')
        }

        const changePassword = await userService.put(user._id, { password: newPass })

        // req.logout((error) => {
        //     if (error) {
        //         return console.log('error logging out the session', error)
        //     }
        // })
        // // !!!!!! CHEKEAR
        // req.user.destroy((error) => {
        //     if (error) {
        //         return console.log('error destroying the session', error)
        //     }
        // })

        res.redirect('/user/login')
    } catch (error) {
        console.error(error)
    }
}

export default {
    sendEmail,
    getRestore,
    postRestore
}