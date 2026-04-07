import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = "onboarding@resend.dev"

export const sendOtpMail = async (to, otp) => {
    try {
        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject: "Reset Your Password",
            html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
        })
        if (error) throw new Error(error.message)
        console.log('OTP mail sent to:', to)
    } catch (err) {
        console.error('sendOtpMail ERROR:', err.message)
        throw err
    }
}

export const sendDeliveryOtpMail = async (user, otp) => {
    try {
        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: user.email,
            subject: "Delivery OTP",
            html: `<p>Your OTP for delivery is <b>${otp}</b>. It expires in 5 minutes.</p>`
        })
        if (error) throw new Error(error.message)
        console.log('Delivery OTP mail sent to:', user.email)
    } catch (err) {
        console.error('sendDeliveryOtpMail ERROR:', err.message)
        throw err
    }
}
