import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import "./Login.css";
const Login = () => {
  const {
    setLoading,
    loading,
    user,
    googleLogin,
    createAccountWithEmailPassword,
    loginWithEmailPassword,
    resetPassword,
  } = useAuth();
  const { state } = useLocation();
  const [data, setData] = useState({});
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    googleLogin()
      .then((res) => {
        setLoading(true);
        // navigate("/")
        window.location.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  if (loading) return <Loading />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data?.email || !data?.password || !data?.username) {
      alert("Please enter your email and password");
    } else {
      createAccountWithEmailPassword(data.email, data.username, data.password);
      setLoading(true);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  if (user?.email)
    return navigate("/", {
      replace: true,
    });

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-lg-6 mx-auto">
          <div className="card shadow-md">
            <div className="card-header">
              {login ? "Login your account" : "Create a account"}
            </div>
            <div className="card-body">
              <img
                src="GButton.jpg"
                className="google-login"
                alt=""
                onClick={handleLogin}
              />
              {login ? (
                <LoginForm
                  loading={loading}
                  setLogin={setLogin}
                  loginWithEmailPassword={loginWithEmailPassword}
                />
              ) : (
                <>
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <input
                      type="text"
                      className="form-control mb-3"
                      name="username"
                      required
                      onChange={handleChange}
                      placeholder="enter username"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control mb-3"
                      onChange={handleChange}
                      placeholder="enter email address"
                    />
                    <input
                      className="form-control mb-3"
                      type="password"
                      required
                      name="password"
                      onChange={handleChange}
                      placeholder="enter password"
                    />
                    <button type="submit" className="btn btn-sm btn-success">
                      Create account
                    </button>
                  </form>
                  <Link to="#"
                    disabled={loading}
                    onClick={() => setLogin(true)}
                    className="d-block my-2"
                  >
                    Already have an account?
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ setLogin, loginWithEmailPassword, loading }) => {
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return alert("please enter email and password");
    } else {
      loginWithEmailPassword(data?.email, data?.password);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          onChange={handleChange}
          required
          placeholder="enter email address"
        />
        <input
          className="form-control mb-3"
          type="password"
          required
          name="password"
          onChange={handleChange}
          placeholder="enter password"
        />
        <button type="submit" className="btn btn-sm btn-success">
          Login
        </button>
        <Link style={{ margin: "0 10px" }} to="/reset-password">
          Forgot Password?
        </Link>
      </form>

      <Link
        to="#"
        onClick={() => setLogin(false)}
        className="d-block my-2"
      >
        Need an account?
      </Link>
    </>
  );
};

export default Login;
