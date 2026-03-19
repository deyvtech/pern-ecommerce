import axios, { isAxiosError } from "axios";

export default axios.create({
	baseURL: import.meta.env.VITE_EXPRESS_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export { isAxiosError };

export const axiosPrivate = axios.create({
	baseURL: import.meta.env.VITE_EXPRESS_API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});
