import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmationPopup({
  show,
  onClose,
  onSubmit,
  title,
  content,
  negativeButtonText = "No",
  positiveButtonText = "Yes",
}) {
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {negativeButtonText}
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {positiveButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationPopup;
