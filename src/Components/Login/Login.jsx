import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
const Login = () => {
  const { setLoading, loading, user, googleLogin } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleLogin = () => {
    googleLogin()
      .then((res) => {
        setLoading(true);
        // navigate("/")
        window.location.replace("/")
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  if (loading) return <Loading />;
  if (user?.email)
    return navigate("/", {
      replace: true,
    });

  return (
    <div className="container">
      <div className="row h-100 w-100 justify-content-center align-items-center">
        <img
          onClick={handleLogin}
          src="/GButton.jpg"
          style={{
            width: "350px",
            margin: "200px auto",
            cursor: "pointer",
          }}
          alt="Google Button"
          className="img-fluid"
        />
      </div>
    </div>
  );
};

export default Login;
