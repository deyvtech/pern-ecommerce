import { RouterProvider } from "react-router/dom";

import { ThemeProvider } from "./contexts/ThemeProvider";
import { router } from "./routes";

const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};

export default App;
