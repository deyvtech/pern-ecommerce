import { createBrowserRouter } from "react-router";

// Layouts
import WrapperLayout from "@/layouts/WrapperLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoutes from "@/ProtectedRoutes";
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
		path: "/",
		Component: WrapperLayout,
		children: [
			{
				element: (
					<ProtectedRoutes allowedRoles={["admin"]} />
				),
				children: [
					{
						path: "/admin",
						Component: AdminLayout,
						children: [
							{
								index: true,
								Component: Dashboard,
							},
							{
								path: "products",
								Component: Products,
							},
							{
								path: "orders",
								Component: Orders,
							},
							{
								path: "customers",
								Component: Customers,
							},
							{
								path: "analytics",
								Component: Analytics,
							},
						],
					},
				],
			},
			// Login User Only
			{
				element: <ProtectedRoutes />,
				children: [
					{
						path: "me",
						Component: Me
					}
				]
			},
			// No Protected
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
	{
		path: "*",
		Component: NotFoundPage,
	},
]);
