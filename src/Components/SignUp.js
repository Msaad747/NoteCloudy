import React, { useContext, useState, useEffect } from "react";
import UserContext from "../Context/User/UserContext";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const { createUser, signupref, signupCloseref, alertUser } =
    useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [signupError, setSignupError] = useState("");

  //   load form on reload
  useEffect(() => {
    signupref.current.click();
    // eslint-disable-next-line
  }, []);

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const SignUpClick = async () => {
    
    const response = await createUser({...user,age:user.age?user.age:null});
    if (response.success) {
      setSignupError("");
      signupCloseref.current.click();
      navigate("/");
      alertUser("Successfully Signed Up", "success");
    } else {
      setSignupError(response.message);
    }
  };

  return (
    <>
      <div>
        {/* <!-- Button trigger modal --> */}

        <button
          ref={signupref}
          type="button"
          className="btn btn-primary d-none "
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
                  Sign Up
                </h1>
              </div>
              <div className="modal-body">
                {/* Modal Body  */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    value={user.name}
                    onChange={onchange}
                  />
                </div>
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
                    value={user.email}
                    onChange={onchange}
                  />
                </div>
                <div className="d-flex gap-2">
                  <div>
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      aria-describedby="passwordHelpBlock"
                      value={user.password}
                      placeholder="Password"
                      onChange={onchange}
                      minLength={5}
                    />
                    <div id="passwordHelpBlock" className="form-text">
                      Your password must be 8-20 characters long, contain
                      letters and numbers, and must not contain spaces, special
                      characters, or emoji.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      Age
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="age"
                      placeholder="Age"
                      value={user.age}
                      onChange={onchange}
                      min={0}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link to="/login" className="me-auto" onClick={()=>{
                  signupCloseref.current.click();
                }}>
                  Already have an Account
                </Link>

                {signupError && (
                  <span className="form-text text-danger mx-3">
                    {signupError}
                  </span>
                )}
                <button
                  ref={signupCloseref}
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
                  onClick={SignUpClick}
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
