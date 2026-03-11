import { Resend } from "resend";
import config from "../config.js";

export const generateOTP = () => {
	return Math.floor(100000 + Math.random() * 900000);
};

const emailTemplate = (username: string, otp: number) => {
	return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: Arial, sans-serif;
        background:#f4f6f8;
        padding:30px;
      }
      .container{
        max-width:500px;
        margin:auto;
        background:white;
        padding:30px;
        border-radius:8px;
        text-align:center;
        box-shadow:0 4px 10px rgba(0,0,0,0.05);
      }
      .otp{
        font-size:32px;
        letter-spacing:6px;
        font-weight:bold;
        color:#2d6cdf;
        margin:20px 0;
      }
      .footer{
        font-size:12px;
        color:#888;
        margin-top:20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Email Verification</h2>

      <p>Hello ${username},</p>

      <p>Your One-Time Password (OTP) is:</p>

      <div class="otp">${otp}</div>

      <p>This code will expire in <b>5 minutes</b>.</p>

      <p>If you did not request this, please ignore this email.</p>

      <div class="footer">
        © ${new Date().getFullYear()} E-commerce
      </div>
    </div>
  </body>
  </html>
  `;
};

export const sendOTP = async (username: string, email: string, otp: number) => {
	const resend = new Resend(config.resend_api_key);
	const from = "E-commerce <noreply@deyv.codes>";
	const { data, error: emailError } = await resend.emails.send({
		from,
		to: ["kingnorway17@gmail.com"],
		subject: "Ecommerce OTP KEY",
		html: emailTemplate(username, otp),
		text: "Welcome! This email was sent using Resend's Node.js SDK.",
	});

	return { data, emailError };
};
