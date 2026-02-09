import { Outlet, ScrollRestoration } from "react-router";

const AdminLayout = () => {
	return (
		<>
			<ScrollRestoration />
			<Outlet />
		</>
	);
};

export default AdminLayout;
