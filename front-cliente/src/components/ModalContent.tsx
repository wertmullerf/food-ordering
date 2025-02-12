import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

interface ModalContentProps {
  onClose: () => void;
}

export const ModalContent: React.FC<ModalContentProps> = ({ onClose }) => {
  const [pedidoId, setPedidoId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirigirPedido();
  };

  const redirigirPedido = () => {
    if (pedidoId.trim() !== "") {
      navigate(`/pedido/${pedidoId}`);
      onClose();
    }
  };

  return (
    <>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "var(--dark-bg)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Modal.Title>
          <div className="d-flex align-items-center">
            <span className="me-2" style={{ fontSize: "1.2rem" }}>
              🔍
            </span>
            <span style={{ color: "var(--text-primary)", fontSize: "1.1rem" }}>
              Buscar Pedido
            </span>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{ backgroundColor: "var(--dark-bg)", padding: "1.5rem" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Ingresá el ID del Pedido"
              value={pedidoId}
              onChange={(e) => setPedidoId(e.target.value)}
              style={{
                backgroundColor: "var(--dark-surface)",
                color: "var(--text-primary)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "0.8rem 1rem",
                fontSize: "1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
                borderRadius: "8px",
                padding: "0.8rem",
                fontSize: "1rem",
                fontWeight: "500",
                border: "none",
                transition: "all 0.2s ease",
                opacity: "0.9",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <i className="bi bi-search me-2"></i>
              Buscar
            </button>
            <button
              type="button"
              className="btn"
              onClick={onClose}
              style={{
                backgroundColor: "transparent",
                color: "var(--text-secondary)",
                borderRadius: "8px",
                padding: "0.8rem",
                fontSize: "0.95rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};
