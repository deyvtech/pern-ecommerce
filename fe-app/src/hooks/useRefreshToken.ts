import React from "react";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();

	const refresh = async () => {
		const response = await axios.get("/auth/refresh", {
			withCredentials: true,
		});
		setAuth((prev):  => {...prev, response.data.accessToken} )
	};
};

export default useRefreshToken;
