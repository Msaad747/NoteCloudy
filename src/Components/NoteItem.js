import React,{useContext} from "react";
import NoteContext from "../Context/Note/NoteContext";

const NoteItem = (props) => {
    const context=useContext(NoteContext);
    const{deleteNote}=context;
    const Delete=()=>{
        deleteNote(props.note.id);
    }
  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card " style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title" id="title" name="title">
              {props.note.title}
            </h5>

            <p className="card-text" id="description" name="description">
              {props.note.description}
            </p>
            <i className="fa-solid fa-trash mx-2  " onClick={Delete}></i>
            <i className="fa-solid fa-pen-to-square mx-2"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
