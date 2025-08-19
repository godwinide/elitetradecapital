const Resend = require("resend");

async function sendPasswordResetEmail(receipient, linkId){
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
        headers: {
            "X-My-Header": "Elite Trade Capital"
        },
        from: "Elite Trade Capital <noreply@elitetradecapital.pro>",
        subject: "Reset Password",
        to: [receipient],
        html: `
            <p>Click the link below to reset your password:</p>
            <p><a href="https://elitetradecapital.pro/reset-password?code=${linkId}">Reset Password</a></p>
            <p>Thank you for Elite Trade Capital!</p>
            `
      });
}

module.exports = sendPasswordResetEmail