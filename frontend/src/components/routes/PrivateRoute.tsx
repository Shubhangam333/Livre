import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

export default function PrivateRoute() {
  const { user } = useAppContext();
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}
