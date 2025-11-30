const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

async function sendVerificationEmail(email, otp) {
  const mailOptions = {
    from: `YourApp <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your Email Verification Code",
    html: `
      <h2>Your Verification Code</h2>
      <p style="font-size:22px; font-weight:bold;">${otp}</p>
      <p>Enter this code in the app to verify your email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
