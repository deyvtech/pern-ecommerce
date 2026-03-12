import { Resend } from "resend";
import config from "../config/config.js";
import { emailTemplate } from "./emailHelper.js";

export const generateOTP = () => {
	return Math.floor(100000 + Math.random() * 900000);
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