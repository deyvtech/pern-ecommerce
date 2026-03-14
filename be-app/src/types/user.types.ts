export interface User {
	username: string;
	email: string;
	password: string;
	otp?: number,
}

export interface UserResponseType {
	success: boolean;
	message: string;
	status: number,
	token?: string;
	user?: { role: "admin" | "customer"; username: string; email: string };
}
