import { createBrowserRouter } from "react-router";

// Layouts
import WrapperLayout from "./layouts/WrapperLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

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

export const router = createBrowserRouter([
	{
		path: "/",
		Component: WrapperLayout,
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
