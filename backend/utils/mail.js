import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail=async (to,otp) => {
    try {
        await transporter.sendMail({
            from:process.env.EMAIL,
            to,
            subject:"Reset Your Password",
            html:`<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
        })
        console.log('OTP mail sent to:', to)
    } catch (err) {
        console.error('sendOtpMail ERROR:', err.message, err.code, err.response)
        throw err
    }
}


export const sendDeliveryOtpMail=async (user,otp) => {
    try {
        await transporter.sendMail({
            from:process.env.EMAIL,
            to:user.email,
            subject:"Delivery OTP",
            html:`<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
        })
        console.log('Delivery OTP mail sent to:', user.email)
    } catch (err) {
        console.error('sendDeliveryOtpMail ERROR:', err.message, err.code, err.response)
        throw err
    }
}
