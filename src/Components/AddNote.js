import React, { useContext, useState } from "react";
import NoteContext from "../Context/Note/NoteContext";



const AddNote = () => {
  const [newnote, setNewNote] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const { addnote } = useContext(NoteContext);
  const AddNoteClick = () => {
    console.log("Note added");
    if (newnote.title.trim() === "") {
    alert("Title is required");
    return;
  }
    addnote(newnote);
   setNewNote({
    title: "",
    description: "",
    tags: "",
  })
  };
  const onChange = (e) => {
    setNewNote({ ...newnote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="mb-3 my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={newnote.title}
          onChange={onChange}
          placeholder="Add your Note"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          value={newnote.description}
          name="description"
          onChange={onChange}
          rows="3"
        ></textarea>
        <div className="col-auto ">
          <button
            type="submit"
            className="btn btn-primary mb-3 my-2"
            onClick={AddNoteClick}
            disabled={newnote.title.trim() === ""}
          >
            Add Note
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNote;
