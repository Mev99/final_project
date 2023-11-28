import nodemailer from "nodemailer"

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'matiayesa99@gmail.com',
        pass: process.env.EMAIL_PASS
    }
})
