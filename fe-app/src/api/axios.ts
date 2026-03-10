import axios, { isAxiosError } from "axios";

export default axios.create({
	baseURL: import.meta.env.VITE_EXPRESS_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export { isAxiosError };

export const privateInstance = axios.create({
	baseURL: import.meta.env.VITE_EXPRESS_API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});
