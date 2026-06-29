import "./App.css";
import React, { useContext } from "react";
import Alert from "./Components/Alert";
import Home from "./Components/Home";
import About from "./Components/About";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import UserContext from "./Context/User/UserContext";

function App() {
  const title = "NoteCloudy";
  const { showAlert, alertUser } = useContext(UserContext);

  return (
    <>
      <Navbar title={title} />
      <Alert showAlert={showAlert} />
      <div>
        <Routes>
          <Route exact path="/" element={<Home  />} />
          <Route exact path="/login" element={<Login alert={alertUser} />} />
          <Route exact path="/signup" element={<SignUp alert={alertUser} />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
