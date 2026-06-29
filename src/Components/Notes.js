import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Note/NoteContext";
import UserContext from "../Context/User/UserContext.js";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote.js";
import EditModal from "./EditModal.js";
import { Link } from "react-router-dom";

const Notes = () => {
  const showref = useRef(null);
  const closeref = useRef(null);

  const { notes, fetchAllNotes, setENote } = useContext(NoteContext);
  const { signupref, loginref, authtoken, setAuthToken, alertUser } = useContext(UserContext);
  const [editnote, setEditNote] = useState(null);

  // Initial Fetch
  useEffect(() => {
    fetchAllNotes();
    // eslint-disable-next-line
  }, []);


  // Logout
  const logout = () => {
  localStorage.removeItem("token");
  setAuthToken(null);
  alertUser("Logged out successfully", "success");
};

  // To open SignUp Form
  const openSignUpForm = () => {
    setTimeout(() => {
      signupref.current.click();
    }, 200);
  };

  // To open Login Form
  const openLoginForm = () => {
    setTimeout(() => {
      loginref.current.click();
    }, 200);
  };

  const Update = async (note) => {
    setENote({
      id: note.id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });

    setEditNote(note);
    showref.current.click();
  };

  return (
    <>
      {!authtoken ? (
        <div className="d-grid  d-md-flex justify-content-md-end mt-2">
          <Link
            to="/login"
            className="btn btn-primary md-2 mx-1"
            type="button"
            onClick={openLoginForm}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn btn-primary me-5 "
            type="button"
            onClick={openSignUpForm}
          >
            SignUp
          </Link>
        </div>
      ) : (
         <div className="d-grid  d-md-flex justify-content-md-end mt-2">
          
        <Link
          to="/login"
          className="btn btn-primary me-5 justify-content-end"
          type="button"
          onClick={logout}
          >
          Logout
        </Link>
          </div>
        
      )}

      <div className="container">
        <h1>Add notes</h1>
        <AddNote />
        <EditModal showref={showref} closeref={closeref} editnote={editnote} />

        <h2>Your Notes</h2>
        <div className="row">
          {notes.length === 0 ? (
            <p>No Notes Available</p>
          ) : (
            notes.map((note) => {
              return <NoteItem key={note.id} note={note} update={Update} />;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
