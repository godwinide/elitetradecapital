const {Resend} = require("resend");

async function sendWelcomeEmail(receipient){
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const data = await resend.emails.send({
            from: "Elite Trade Capital <noreply@elitetradecapital.pro>",
            subject: "Welcome to Elite Trade Capital",
            to: [receipient],
            html: `
                <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111">
                  <h2 style="margin:0 0 16px">Welcome to Elite Trade Capital</h2>
                  <p>We're excited to have you on board. Your account has been created successfully.</p>
                  <p>You can log in anytime to manage your portfolio, make deposits, and track performance.</p>
                  <p>
                    <a href="https://elitetradecapital.pro/login" style="display:inline-block;background:#0b5ed7;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Go to Dashboard</a>
                  </p>
                  <p>If you did not sign up for this account, please ignore this email.</p>
                  <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
                  <p style="font-size:12px;color:#555">This is an automated message from Elite Trade Capital. Do not reply.</p>
                </div>
                `
          });
        return data;
    } catch (error) {
        console.log('Email sending error:', error);
        throw error;
    }
}

module.exports = sendWelcomeEmail;