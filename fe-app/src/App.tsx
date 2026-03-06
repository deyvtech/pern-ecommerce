import { RouterProvider } from "react-router/dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthProvider";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { router } from "./routes";
const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<RouterProvider router={router} />
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
