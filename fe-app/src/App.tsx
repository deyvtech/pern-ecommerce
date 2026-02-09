import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
// Pages
import { Dashboard, Products, Orders, Customers, Analytics } from "./pages";
import { ThemeProvider } from "./components/ThemeProvider";

const router = createBrowserRouter([
	{
		path: "/admin",
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "products",
				element: <Products />,
			},
			{
				path: "orders",
				element: <Orders />,
			},
			{
				path: "customers",
				element: <Customers />,
			},
			{
				path: "analytics",
				element: <Analytics />,
			},
		],
	},
]);
const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
