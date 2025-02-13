import React from "react";
import { IProducto } from "../types/IProducto";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<{ producto: IProducto }> = ({ producto }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card border-0 h-100 overflow-hidden"
      style={{
        backgroundColor: "var(--dark-surface)",
        cursor: "pointer",
        borderRadius: "16px",
      }}
      onClick={() => navigate(`/producto/${producto._id}`)}
    >
      <div className="position-relative">
        <img
          src={producto.imageUrl}
          className="card-img-top"
          alt={producto.nombre}
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />
        <div
          className="position-absolute bottom-0 start-0 w-100 p-3"
          style={{
            background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
          }}
        >
          <span
            className="badge"
            style={{
              backgroundColor: "var(--accent-color)",
              fontSize: "1rem",
              padding: "8px 16px",
              borderRadius: "50px",
            }}
          >
            ${producto.precio.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="card-body p-4">
        <h5 className="text-white mb-2 fw-bold">{producto.nombre}</h5>
        <p
          className="text-secondary mb-0"
          style={{
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}
        >
          {producto.descripcion}
        </p>
      </div>

      <div className="card-footer border-0 bg-transparent p-4 pt-0">
        <button
          className="btn w-100"
          style={{
            backgroundColor: "var(--dark-surface-2)",
            color: "var(--text-primary)",
            borderRadius: "50px",
            padding: "10px 20px",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.stopPropagation();
            e.currentTarget.style.backgroundColor = "var(--accent-color)";
          }}
          onMouseOut={(e) => {
            e.stopPropagation();
            e.currentTarget.style.backgroundColor = "var(--dark-surface-2)";
          }}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
