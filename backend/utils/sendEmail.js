const nodemailer = require('nodemailer');

const sendEmail = async (email, resetLink) => {

  try {

    const transporter = nodemailer.createTransport({

      service: 'gmail',

      auth: {

        user: process.env.EMAIL,

        pass: process.env.EMAIL_PASSWORD

      }

    });

    await transporter.sendMail({

      from: `"User Management System" <${process.env.EMAIL}>`,

      to: email,

      subject: 'Reset Your Password',

      html: `

      <div style="
        max-width:600px;
        margin:auto;
        padding:40px;
        background:#ffffff;
        font-family:Arial,sans-serif;
        border-radius:12px;
        box-shadow:0 5px 20px rgba(0,0,0,.08);
      ">

        <h2 style="color:#111827;">
          Reset Your Password
        </h2>

        <p style="color:#374151;">
          Hello,
        </p>

        <p style="color:#374151;">
          We received a request to reset the password for your account.
        </p>

        <p style="color:#374151;">
          Click the button below to create a new password:
        </p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            padding:12px 24px;
            background:#6366f1;
            color:white;
            text-decoration:none;
            border-radius:8px;
            margin:15px 0;
          ">
          Reset Password
        </a>

        <p style="color:#374151;">
          If the button above does not work, copy and paste the following link into your browser:
        </p>

        <p style="
          word-break:break-all;
          color:#6366f1;
        ">
          ${resetLink}
        </p>

        <p style="color:#ef4444;">
          This link will expire in 15 minutes.
        </p>

        <hr style="margin:25px 0;">

        <p style="
          font-size:12px;
          color:#6b7280;
        ">
          If you did not request a password reset, you can safely ignore this email.
        </p>

        <p style="
          font-size:12px;
          color:#6b7280;
        ">
          © User Management System. All rights reserved.
        </p>

      </div>

      `

    });

  } catch (error) {

    console.log(error);

    throw error;

  }

};

module.exports = sendEmail;