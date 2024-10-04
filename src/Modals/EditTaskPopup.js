import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function EditTaskPopup({ show, value = "", onClose, onSubmit, title }) {
  const [task, settask] = useState(value);

  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <p>Enter Task</p>
          <input
            placeholder="enter your task"
            value={task}
            onChange={(e) => settask(e.target.value)}
            className="form-control col-5 my-3"
          />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                onSubmit(task);
              }}
            >
              Update Task
            </button>
          </div>
        </>
      </Modal.Body>
    </Modal>
  );
}

export default EditTaskPopup;
