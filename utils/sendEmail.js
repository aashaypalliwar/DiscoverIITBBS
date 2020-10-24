const nodemailer = require('nodemailer');
const AppError = require('./appError');
const config = require('./config');

const sendEmail = async options => {

    try{
        // 1) Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'raj.karthikeya2002',
                pass: 'chinnaraj123'
            }
        });

        // 2) Define the email options
        const mailOptions = {
            from: "raj.karthikeya2002@gmail.com",
            to: options.email,
            subject: options.subject,
            text: options.message,
            // attachments: options.attachments
        };

        // 3) Actually send the email
        let message = await transporter.sendMail(mailOptions);
    }
    catch(err){
        throw new AppError(err, 500)
    }
};



module.exports = {
    sendEmail
};