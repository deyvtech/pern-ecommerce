import { Outlet } from "react-router";
import authBg from "../assets/auth-bg.jpeg";

const AuthLayout = () => {
	return (
		<div className="grid h-screen w-screen grid-cols-1 md:grid-cols-2 gap-20 p-5">
			<div>
				<img
					src={authBg}
					alt="Login Background"
					className="h-full w-full object-cover rounded-4xl shadow-lg"
				/>
			</div>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
