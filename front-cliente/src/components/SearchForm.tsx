import { Modal } from "react-bootstrap";
import { useState } from "react";
import { ModalContent } from "./ModalContent";

export const SearchForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="alert alert-success"
        role="alert"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      >
        <strong>Buscar Pedido</strong>
      </div>

      <Modal show={show} onHide={handleClose}>
        <ModalContent onClose={handleClose} />
      </Modal>
    </>
  );
};
