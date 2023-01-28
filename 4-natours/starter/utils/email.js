const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
    //1. Create A Transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    //2. Define Email Options
    const mailOptions = {
        from: 'ogags@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    //3. Send the Email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail