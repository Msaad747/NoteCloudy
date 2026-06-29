import React from "react";

const Alert = (props) => {
  const { showAlert } = props;
  if (showAlert === null) return null;
  return (
    <>
      <div className={`alert alert-${showAlert.type} `} role="alert">
        {showAlert.message}
      </div>
    </>
  );
};

export default Alert;
