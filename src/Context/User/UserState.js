import React, { useState, useRef } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
  const signupref = useRef(null);
  const signupCloseref = useRef(null);
  const loginref = useRef(null);
  const loginCloseref = useRef(null);

  const [User, setUser] = useState({ name: "saad" });
  const [authtoken, setAuthToken] = useState(localStorage.getItem("token"));
  const [showAlert, setShowAlert] = useState(null);

  const alertUser = (message, type) => {
    setShowAlert({
      message,
      type,
    });
    setTimeout(() => {
      setShowAlert(null);
    }, 1500);
  };

  const server =
   process.env.REACT_APP_SERVER;
    // ||
    // "http://localhost:5000";

  // Create User
  const createUser = async (user) => {
    try {
      
      const respones = await fetch(`${server}/usersData/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await respones.json();

      if (data.message === "User created") {
        // eslint-disable-next-line
        const token = localStorage.setItem("token", data.token);
        setAuthToken(data.token);
        setUser(data.user);
        return {
          success: true,
        };
      } // Validation errors
      if (data.errors) {
        return {
          success: false,
          message: data.errors[0].msg,
        };
      }

      // Other errors (e.g. Email already exists)
      return {
        success: false,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong.",
      };
    }
  };

  //   Login User
  const login = async (user) => {
    try {
      const respones = await fetch(`${server}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await respones.json();
      if (data.message === "Login successful") {
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);
        setUser(data.user);
        return true;
      }
      console.log(data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        User,
        createUser,
        signupref,
        signupCloseref,
        login,
        authtoken,
        setAuthToken,
        loginref,
        loginCloseref,
        showAlert,
        setShowAlert,
        alertUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
