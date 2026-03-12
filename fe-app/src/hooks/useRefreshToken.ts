import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const { data } = await axios.get("/auth/refresh", {
			withCredentials: true,
		});
		const accessToken = data.token;
		const user = data.user;
		setAuth((prev) => {
			return { ...prev, token: accessToken, user };
		});
		return accessToken;
	};

	return refresh;
};

export default useRefreshToken;
