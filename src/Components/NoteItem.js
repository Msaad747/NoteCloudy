import React, { useContext } from "react";
import NoteContext from "../Context/Note/NoteContext";
import UserContext from "../Context/User/UserContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { alertUser } = useContext(UserContext);
  const { deleteNote } = context;
  const { update, note } = props;


  const Delete = async () => {
    const response = await deleteNote(note.id);

    if (response.success) {
      alertUser(response.message, "success");
    } else {
      alertUser(response.message, "danger");
    }
  };

  return (
    <>
      <div className="col-md-3 my-3">
        <div className="card " style={{ width: "18rem" }}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title" id="title" name="title">
                {props.note.title}
              </h5>
              <div className="d-flex justify-content-end">
                <i className="fa-solid fa-trash mx-2  " onClick={Delete}></i>
                <i
                  className="fa-solid fa-pen-to-square mx-2"
                  onClick={() => {
                    update(note);
                  }}
                ></i>
              </div>
            </div>

            <p className="card-text" id="description" name="description">
              {props.note.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
