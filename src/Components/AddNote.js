import React, { useContext, useState } from "react";
import NoteContext from "../Context/Note/NoteContext";
import UserContext from "../Context/User/UserContext";

const AddNote = () => {
  const [newnote, setNewNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const { addnote } = useContext(NoteContext);
  const {alertUser}=useContext(UserContext)
  const AddNoteClick = async() => {
    console.log("Note added");
    if (newnote.title.trim() === "") {
      alert("Title is required");
      return;
    }

    const response = await addnote(newnote);
    setNewNote({
      title: "",
      description: "",
      tag: "",
    });
    if(response.success){

      alertUser("Note added Successfully","success")
    }
    else{
      alertUser("Some Error Occurred","danger")

    }
  };
  const onChange = (e) => {
    setNewNote({ ...newnote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={newnote.title}
          onChange={onChange}
          placeholder="Add your Note Title"
          />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          value={newnote.description}
          name="description"
          onChange={onChange}
          rows="3"
          placeholder="Add Description"
        ></textarea>
        <div className="my-2">

        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={newnote.tag}
          onChange={onChange}
          placeholder="Add Tag"
          />
          </div>
        <div className="col-auto ">
          <button
            type="submit"
            className="btn btn-primary mb-3 my-2"
            onClick={AddNoteClick}
            disabled={newnote.title.trim() === ""||newnote.title.length<5}
          >
            Add Note
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNote;
