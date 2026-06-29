import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UserState from "./Context/User/UserState";
import NoteState from "./Context/Note/NoteState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserState>
    <NoteState>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </NoteState>
  </UserState>,
);

reportWebVitals();
