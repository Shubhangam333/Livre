import { Outlet, Navigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

export default function AdminPrivateRoute() {
  const { data: user } = useProfile();
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}
