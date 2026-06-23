import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const server = "http://localhost:5000";
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3ODIyMzA2ODYsImV4cCI6MTc4MjMxNzA4Nn0.a2Uq-qh3fekr5zwxZUpLzJes6sMFVaZeObRrIbD5n78";

  // fetch all Notes
  const fetchAllNotes = async () => {
    try {
      const response = await fetch(`${server}/fetchAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        // body: JSON.stringify({"adminPass":"admin6767"})
      });
      console.log("fetch called")
      const data = await response.json();
      console.log(data)
      setNotes(data.notes || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    }
  };

  // Add note functinality
  const addnote = (newnote) => {
    const newNote = {
      id: Math.random(),
      userId: 1,
      title: newnote.title,
      description: newnote.description,
      tags: newnote.tags,
      date: "2026-06-23T10:00:55.344Z",
      createdAt: "2026-06-23T10:00:55.345Z",
      updatedAt: "2026-06-23T10:00:55.345Z",
    };
    setNotes([...notes, newNote]);
  };
  // update notes functionality
  const updateNotes = () => {};
  // delete Notes functionality
  const deleteNote = (id) => {
    const newlist = notes.filter((note) => note.id !== id);
    setNotes(newlist);
  };

  const [notes, setNotes] = useState([]);

  return (
    <NoteContext.Provider
      value={{ addnote, updateNotes, deleteNote, notes, fetchAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
