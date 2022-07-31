import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const ResetPassword = () => {
  const [data, setData] = useState({});
  const { loading, resetPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email) {
      return alert("please enter email");
    } else {
      resetPassword(data?.email);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-lg-6 mx-auto">
          <div className="card shadow-md">
            <div className="card-header">Reset your password</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} autoComplete="off">
                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  onChange={handleChange}
                  required
                  placeholder="enter email address"
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-sm btn-success"
                >
                  Send link to reset
                </button>
              </form>
              <Link to="/login" className="my-2 d-block">
                Login to your account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
