const {Resend} = require("resend");

async function sendPasswordResetEmail(receipient, linkId){
    const resend = new Resend(process.env.RESEND_API_KEY);
    const [data, error] = await resend.emails.send({
        from: "Elite Trade Capital <noreply@elitetradecapital.pro>",
        subject: "Reset Password",
        to: [receipient],
        html: `
            <p>Click the link below to reset your password:</p>
            <p><a href="https://elitetradecapital.pro/reset-password?code=${linkId}">Reset Password</a></p>
            <p>Thank you for Elite Trade Capital!</p>
            `
      });
    if(error){
        console.log(error);
    }
    return data;
}

module.exports = sendPasswordResetEmail