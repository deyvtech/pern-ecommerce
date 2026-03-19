import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { useCallback } from "react";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = useCallback(async () => {
        const response = await axios.post("/auth/refresh", {}, {
            withCredentials: true,
        });
        const { token, user } = response.data;
        setAuth({ token, user });
        return token;
    }, [setAuth]);

    return refresh;
};

export default useRefreshToken;