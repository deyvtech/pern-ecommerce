import React from "react";
export interface AuthStateType {
	token: string | null;
};

interface AuthContextType {
	auth: AuthStateType | null;
	setAuth: React.Dispatch<React.SetStateAction<AuthStateType | null>>;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = React.useState<AuthStateType | null>(null);
	return <AuthContext value={{ auth, setAuth }}>{children}</AuthContext>;
};

export default AuthContext;
