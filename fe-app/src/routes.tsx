import { createBrowserRouter } from "react-router"; // Make sure it's react-router-dom if using DOM

// Layouts & Wrappers
import WrapperLayout from "@/layouts/WrapperLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoutes from "@/ProtectedRoutes";
import PersistentLogin from "@/layouts/PersistentLogin"; // Add this import!

// Pages
import {
	Dashboard,
	Products,
	Orders,
	Customers,
	Analytics,
	NotFoundPage,
	Auth,
} from "./pages";
import Me from "./pages/me";

export const router = createBrowserRouter([
	{
		element: <PersistentLogin />, 
		children: [
			{
				path: "/",
				Component: WrapperLayout,
				children: [
					// --- ADMIN ROUTES ---
					{
						element: <ProtectedRoutes allowedRoles={["admin"]} />,
						children: [
							{
								path: "admin", 
								Component: AdminLayout,
								children: [
									{ index: true, Component: Dashboard },
									{ path: "products", Component: Products },
									{ path: "orders", Component: Orders },
									{ path: "customers", Component: Customers },
									{ path: "analytics", Component: Analytics },
								],
							},
						],
					},
					// --- STANDARD USER ROUTES ---
					{
						element: <ProtectedRoutes />,
						children: [
							{
								path: "me",
								Component: Me
							}
						]
					},
					// --- PUBLIC ROUTES ---
					{
						Component: AuthLayout,
						children: [
							{
								path: "auth",
								Component: Auth,
							},
						],
					},
				],
			},
		]
	},
	{
		path: "*",
		Component: NotFoundPage,
	},
]);