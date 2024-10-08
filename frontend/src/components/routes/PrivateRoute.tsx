import { Outlet, Navigate } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";

export default function PrivateRoute() {
  const { data: user } = useProfile();
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}
