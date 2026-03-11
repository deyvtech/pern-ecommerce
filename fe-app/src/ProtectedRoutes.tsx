import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";
interface ProtectedRoutesProps {
	allowedRoles?: ("admin" | "customer")[];
}

const ProtectedRoutes = ({
	allowedRoles,
}: ProtectedRoutesProps): React.ReactNode | Promise<React.ReactNode> => {
	const { auth } = useAuth();
	if (!auth?.token) return <Navigate to="/auth" replace={true} />;
	if (allowedRoles && !allowedRoles?.includes(auth.user.role))
		return <Navigate to="/unauthorized" replace={true} />;
	else return <Outlet />;
};

export default ProtectedRoutes;
