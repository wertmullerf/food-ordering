import { Modal } from "react-bootstrap";
import { useState } from "react";
import { ModalContent } from "./ModalContent";

export const SearchForm = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        onClick={() => setShow(true)}
        className="p-3 rounded-4 d-flex align-items-center gap-3"
        style={{
          backgroundColor: "var(--dark-surface)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          border: "1px solid var(--dark-surface-2)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "var(--dark-surface-2)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "var(--dark-surface)";
        }}
      >
        <i className="bi bi-search text-secondary"></i>
        <span className="text-secondary">Buscar mi pedido...</span>
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <ModalContent onClose={() => setShow(false)} />
      </Modal>
    </>
  );
};
