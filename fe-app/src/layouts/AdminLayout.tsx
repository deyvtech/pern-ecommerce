import { Outlet, ScrollRestoration } from "react-router";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
const AdminLayout = () => {
	return (
		<>
			<div className="flex h-screen w-screen p-10 gap-10">
				<AdminSidebar />
				<div className="flex-1 flex flex-col">
					<AdminHeader />
					<ScrollRestoration />
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default AdminLayout;
