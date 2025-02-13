import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartFooter: React.FC = () => {
  const { itemsEnCarrito, totalCarrito } = useCart();
  const location = useLocation();

  // Formatear el total del carrito correctamente (Ej: $2,000.00)
  const formattedTotal = useMemo(
    () =>
      new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(totalCarrito),
    [totalCarrito]
  );

  // Si el carrito está vacío, no mostrar el footer
  if (itemsEnCarrito === 0) return null;
  if (location.pathname === "/checkout") {
    return null;
  }

  return (
    <div
      className="fixed-bottom py-3"
      style={{
        backgroundColor: "var(--dark-surface)",
        borderTop: "1px solid var(--dark-surface-2)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          {/* Íconos y contador de ítems en carrito */}
          <div className="d-flex align-items-center">
            <div
              className="cart-icon"
              style={{
                backgroundColor: "var(--dark-surface-2)",
                padding: "4px 8px",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span className="text-white" style={{ fontSize: "0.9rem" }}>
                🛒
              </span>
              <span
                className="badge"
                style={{
                  backgroundColor: "var(--accent-color)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                }}
              >
                {itemsEnCarrito}
              </span>
            </div>
          </div>

          {/* Total y botón para ir al carrito */}
          <div className="d-flex align-items-center gap-2">
            <span
              className="fw-bold"
              style={{ color: "var(--text-primary)", fontSize: "1rem" }}
            >
              {formattedTotal}
            </span>
            <Link
              to="/carrito"
              className="btn"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
                border: "none",
                borderRadius: "50px",
                padding: "6px 12px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-hover)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-color)")
              }
            >
              Ver Carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartFooter;
