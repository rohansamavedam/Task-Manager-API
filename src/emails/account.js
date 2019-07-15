const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcome = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rohansamavedam@gmail.com',
        subject: 'Thanks For Joining In',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancel = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rohansamavedam@gmail.com',
        subject: 'BYE!',
        text: `Sad to see you go, ${name}`
    })
}

module.exports = {
    sendWelcome,
    sendCancel
}