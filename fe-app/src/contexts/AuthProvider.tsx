import React from "react";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = React.useState({});
	return <AuthContext value={{ auth, setAuth }}>{children}</AuthContext>;
};

export default AuthContext;
