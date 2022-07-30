import React from "react";
import Loading from "../Components/common/Loading";
import useAuth from "../Hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (loading) return <Loading />;
  if (user.email) return <>{children}</>;
  return navigate("/login", {
    state: { location: location },
  });
};

export default PrivateRoute;
