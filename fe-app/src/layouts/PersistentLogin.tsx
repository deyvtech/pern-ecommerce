import { useState, useEffect } from "react";
import { Outlet } from "react-router"; 
import useRefreshToken from "@/hooks/useRefreshToken";
import useAuth from "@/hooks/useAuth";

const PersistentLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		let isMounted: boolean = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err: any) {
				if (err?.response?.status === 401) {
					console.log("No active session. Please log in.");
				} else {
					console.error("Auto-login failed:", err);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		if (!auth?.token) {
			verifyRefreshToken();
		} else {
			setIsLoading(false);
		}

		return () => {
			isMounted = false;
		};
	}, []);

	return isLoading ? <p>Loading session...</p> : <Outlet />;
};

export default PersistentLogin;
