import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const jwtToken = Cookies.get("jwttoken");
  const auth = jwtToken !== undefined;
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
