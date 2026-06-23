import React, { useContext,useEffect } from "react";
import NoteContext from "../Context/Note/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote.js";

const Notes = () => {
  const { notes,fetchAllNotes } = useContext(NoteContext);
 useEffect(()=>{
    fetchAllNotes();
 },[])
  return (
    <>
      <h1>Add notes</h1>
      <AddNote />

      <h2>Your Notes</h2>
      <div className="row">
        {notes.length === 0?<p>No Notes Available</p> :
          notes.map((note) => {
            return <NoteItem key={note.id} note={note} />;
          })}
      </div>
    </>
  );
};

export default Notes;
