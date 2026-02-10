import { Link, NavLink } from "react-router";
import {
	LayoutDashboard,
	ShoppingBag,
	ShoppingCart,
	Users,
	ChartNoAxesCombined,
	LogOut,
	Store,
	Settings,
	UserPen,
	BadgeInfo 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

type SidebarLink = {
	name: string;
	path: string;
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
const sidebarLinks: SidebarLink[] = [
	{ name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
	{ name: "Products", path: "/admin/products", icon: ShoppingBag },
	{ name: "Orders", path: "/admin/orders", icon: ShoppingCart },
	{ name: "Customers", path: "/admin/customers", icon: Users },
	{ name: "Analytics", path: "/admin/analytics", icon: ChartNoAxesCombined },
];

const AdminSidebar = () => {
	return (
		<aside className="w-64 border-r py-10 px-6 h-screen sticky top-0">
			<div className="pt-10">
				<h2 className="text-2xl px-4 font-bold mb-6">
					<Link to="/admin/dashboard">FS Deluxe</Link>
				</h2>
			</div>
			{sidebarLinks.map((link) => (
				<NavLink
					key={link.path}
					to={link.path}
					className={({ isActive }) =>
						`px-4 py-2 flex items-center gap-4 mb-4 text-sm font-medium ${
							isActive
								? "text-primary bg-primary/10 rounded-xl"
								: "text-white"
						}`
					}
				>
					<p className="flex items-center gap-2">
						{link.icon && <link.icon className="h-5 w-5" />}
						{link.name}
					</p>
				</NavLink>
			))}
			<Separator className="my-6" />
			<div className="px-4 py-2 flex flex-col gap-2">
				<NavLink
					to="/"
					className="text-muted-foreground text-sm block mb-6 hover:text-primary transition-colors"
				>
					<Store className="h-4 w-4 inline-block mr-2" />
					Go to Storefront
				</NavLink>

				<NavLink
					to="/settings"
					className="text-muted-foreground text-sm block mb-6 hover:text-primary transition-colors"
				>
					<Settings className="h-4 w-4 inline-block mr-2" />
					Settings
				</NavLink>
				<NavLink
					to="/help"
					className="text-muted-foreground text-sm block mb-6 hover:text-primary transition-colors"
				>
					<BadgeInfo className="h-4 w-4 inline-block mr-2" />
					Help
				</NavLink>
			</div>
			<Separator className="my-6" />
			<div className="absolute bottom-0 left-0 w-full px-4 py-4">
			<NavLink
					to="/logout"
					className="text-destructive text-center text-sm block mb-4 mt-auto hover:text-primary transition-colors"	
				>
				<LogOut className="h-4 w-4 inline-block mr-2" />
					Logout
				</NavLink>
				<p className="text-muted-foreground text-center text-sm">
					© {new Date().getFullYear()} FS Deluxe
				</p>
			</div>
			
		</aside>
	);
};

export default AdminSidebar;
