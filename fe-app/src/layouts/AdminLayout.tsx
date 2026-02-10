import { Outlet, ScrollRestoration } from "react-router";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
const AdminLayout = () => {
	return (
		<>
			<div className="flex h-screen w-screen gap-10">
				<AdminSidebar />
				<ScrollArea className="h-full w-full rounded-lg">
					<div className="flex-1 flex flex-col">
						<AdminHeader />
						<ScrollRestoration />
						<div className="py-10 pl-10 pr-20 w-full h-full overflow-y-auto">
							<Outlet />
						</div>
					</div>
				</ScrollArea>
			</div>
		</>
	);
};

export default AdminLayout;
