import { Link } from "react-router";

const sidebarLinks = [
	{ name: "Dashboard", path: "/admin" },
	{ name: "Products", path: "/admin/products" },
	{ name: "Orders", path: "/admin/orders" },
	{ name: "Customers", path: "/admin/customers" },
	{ name: "Analytics", path: "/admin/analytics" },
];

const AdminSidebar = () => {
	return (
		<aside className="w-64 border-r p-4">
            <div>
                <h2 className="text-2xl text-red-500 font-bold mb-6">FS Deluxe</h2>
            </div>
			{sidebarLinks.map((link) => (
				<Link key={link.path} to={link.path} className="mr-4 mb-5 flex flex-col ">
					{link.name}
				</Link>
			))}
		</aside>
	);
};

export default AdminSidebar;
