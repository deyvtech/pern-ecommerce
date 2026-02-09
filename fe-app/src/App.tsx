import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AdminLayout from "@/layouts/AdminLayout";
import { ThemeProvider } from "@/components/ThemeProvider";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AdminLayout />,
		children: [
			{
				path: "dashboard",
				element: <div>Dashboard</div>,
			},
		],
	},
]);
export function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
