import config from "../config/config.js";
import { Resend } from "resend";
import {
	resetPasswordEmailTemplate,
	otpEmailTemplate,
} from "./emailTemplate.js";

export const sendOTP = async (username: string, email: string, otp: number) => {
	const resend = new Resend(config.resend_api_key);
	const from = config.email_sender;
	const { data, error: emailError } = await resend.emails.send({
		from,
		to: ["kingnorway17@gmail.com"],
		subject: "Ecommerce OTP KEY",
		html: otpEmailTemplate(username, otp),
		text: "Welcome! This email was sent using Resend's Node.js SDK.",
	});
	return { data, emailError };
};

export const sendResetPassword = async (
	username: string,
	email: string,
	resetLink: string,
) => {
	const resend = new Resend(config.resend_api_key);
	const from = config.email_sender;
	const { error: emailError } = await resend.emails.send({
		from,
		to: ["kingnorway17@gmail.com"],
		subject: "Reset Password Link",
		html: resetPasswordEmailTemplate(username, resetLink),
		text: "Welcome! This email was sent using Resend's Node.js SDK.",
	});
	return { emailError };
};
