const twilio = require('twilio')

const sendSMS = async (phone, otp) => {
    //Testing phase
    if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH_TOKEN) {
        console.log(`Mock SMS to +977${phone}`);
        console.log(`Your otp is: ${otp}`);
        return
    }
    try {
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
        await client.messages.create({
            body: `Your Service Booking verifiaction code is: ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: `+977${phone}`
        })
        console.log(`SMS sent to +977${phone}`);
    } catch (error) {
        console.error("Twilio Error:", error.message)
    }
}
module.exports = sendSMS