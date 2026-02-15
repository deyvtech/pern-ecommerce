import { createBrowserRouter } from "react-router";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
// Pages
import { Dashboard, Products, Orders, Customers, Analytics, NotFoundPage } from "./pages";

export const router = createBrowserRouter([
	{
		path: "/admin",
		Component: AdminLayout,
		children: [
			{
				path: "dashboard",
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
        path: "*",
        Component: NotFoundPage,
    }
]);