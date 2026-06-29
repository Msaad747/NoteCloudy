import React, { useContext, useState, useEffect } from "react";
import UserContext from "../Context/User/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const { loginref, loginCloseref, login, alertUser } = useContext(UserContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState();

  //   load form on reload
  useEffect(() => {
    loginref.current.click();
    // eslint-disable-next-line
  }, []);

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const LoginClick = async () => {
    const response = await login(user);
    if (response) {
      loginCloseref.current.click();

      navigate("/");
      alertUser(" Login Successfully", "success");
    } else {
      setLoginError("Wrong email and password");
    }
  };

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        ref={loginref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Login
              </h1>
            </div>
            <div className="modal-body">
              {/* Modal Body */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  onChange={onchange}
                  value={user.email}
                />
              </div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                onChange={onchange}
                value={user.password}
              />
              <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </div>
            </div>
            <div className="modal-footer">
              <Link to="/signup" className="me-auto" onClick={()=>{
                loginCloseref.current.click();
              }}>
                Create new Account
              </Link>
              {loginError && (
                <span className="form-text text-danger mx-5">{loginError}</span>
              )}
              <button
                ref={loginCloseref}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  navigate("/");
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={LoginClick}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
