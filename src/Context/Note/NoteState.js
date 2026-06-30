import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import UserContext from "../User/UserContext";

const NoteState = (props) => {
  const { authtoken } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [enote, setENote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });
  const server = process.env.REACT_APP_SERVER;
  
  
  let token = localStorage.getItem("token");
  
  // Fetch all Notes
  const fetchAllNotes = async () => {
    try {
      console.log(process.env.REACT_APP_SERVER);
      const response = await fetch(`${server}/fetchAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken || token}`,
        }
      });
      const data = await response.json();
      setNotes(data.notes || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    }
  };

  // Add note functinality
  const addnote = async (newnote) => {
    try {
      // API Call to ADD Notes
      const response = await fetch(`${server}/createNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken || token}`,
        },
        body: JSON.stringify(newnote),
      });

      const data = await response.json();
      if (data.message === "Note created successfully") {
        setNotes([...notes, data.note]);
        return {
          success: true,
        };
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  // update notes functionality
  const updateNotes = async (editednote) => {
    try {
      // API CALL TO UPDATE NOTE
      const response = await fetch(`${server}/updateNote/${editednote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken || token}`,
        },
        body: JSON.stringify(editednote),
      });

      const data = await response.json();
      if (data.message === "Note updated successfully") {
        const newNotes = [...notes];

        for (let index = 0; index < newNotes.length; index++) {
          if (newNotes[index].id === data.note.id) {
            newNotes[index] = data.note;
            break;
          }
        }
        setNotes(newNotes);
        return {
          success: true,
        };
      }
      return {
        success: false,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
  // delete Notes functionality
  const deleteNote = async (id) => {
    // API Call
    try {
      const response = await fetch(`${server}/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken || token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const newlist = notes.filter((note) => note.id !== id);
        setNotes(newlist);
        return {
          success: true,
          message: data.message,
        };
      }
      return {
        success: false,
        message: data.message,
      };
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        addnote,
        updateNotes,
        deleteNote,
        notes,
        fetchAllNotes,
        enote,
        setENote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
