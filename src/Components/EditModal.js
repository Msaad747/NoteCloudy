import React, { useContext } from "react";
import NoteContext from "../Context/Note/NoteContext";
import UserContext from "../Context/User/UserContext";

const EditModal = (props) => {
  const { editnote, showref, closeref } = props;
  const { updateNotes, enote, setENote } = useContext(NoteContext);
  const { alertUser } = useContext(UserContext);

  const onChange = (e) => {
    setENote({ ...enote, [e.target.name]: e.target.value, id: editnote.id });
  };

  const EditClick = async () => {
    if (enote.title.trim() === "") {
      alertUser("Title is required", "warning");
      return;
    }

    const response = await updateNotes(enote);

    if (response.success) {
      closeref.current.click();
      alertUser("Note Updated", "success");
    } else {
      alertUser(response.message, "danger");
    }
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        ref={showref}
        style={{ display: "none" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal`}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`exampleModal`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
            </div>

            {/* MODAL BODY */}
            <div className="modal-body">
              {" "}
              <div className="mb-3 my-3">
                <label htmlFor="edittitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edittitle"
                  name="title"
                  value={enote.title}
                  onChange={onChange}
                  placeholder="Edit your Note Title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editdescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="editdescription"
                  value={enote.description}
                  name="description"
                  onChange={onChange}
                  rows="3"
                  placeholder="Edit Description"
                ></textarea>
                <div className="my-2">
                  <label htmlFor="edittag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edittag"
                    name="tag"
                    value={enote.tag}
                    onChange={onChange}
                    placeholder="Edit Tag"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={closeref}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={EditClick}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                // disabled={enote.trim() === "" || enote.title < 5}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
