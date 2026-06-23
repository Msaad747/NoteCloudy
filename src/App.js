import "./App.css";
import React from "react";
import Home from "./Components/Home";
import About from "./Components/About";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NoteState from "./Context/Note/NoteState";

function App() {
  const title = "NoteCloudy";

  return (
    <>
      <NoteState>
        <Navbar title={title} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
