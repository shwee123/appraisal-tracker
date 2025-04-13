//to,from,subject,text
const mailer = require('nodemailer');
const dotenv = require("dotenv").config()
///function

const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:process.env.MAIL_ID,
            pass:process.env.APP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.MAIL_ID,
        to: to,
        subject: subject,
        //text: text
        html:text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}


