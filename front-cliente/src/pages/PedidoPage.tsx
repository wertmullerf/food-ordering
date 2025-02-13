import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import { useIngredientes } from "../context/IngredientesContext";
import { Ingrediente } from "../types/IProducto";
import { IPedido } from "../types/IPedido";

const PedidoPage = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState<IPedido | null>(null);
  const [loading, setLoading] = useState(true);
  const { ingredientes } = useIngredientes();

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        const data = await getOrderById(id ?? "");
        setPedido(data);
      } catch (error) {
        console.error("Error al obtener el pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPedido();
  }, [id]);

  const getNombreIngrediente = (id: string) => {
    return (
      ingredientes.find((ing: Ingrediente) => ing._id === id)?.nombre || "Extra"
    );
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );

  if (!pedido)
    return (
      <div className="container mt-5 text-center">
        <h2>No se encontró el pedido</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al inicio
        </Link>
      </div>
    );

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmado":
        return "bg-success";
      case "pendiente":
        return "bg-warning";
      case "cancelado":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card border-0 rounded-4 shadow-lg"
        style={{ backgroundColor: "var(--dark-surface)" }}
      >
        {/* Header del Pedido */}
        <div
          className="card-header border-0 p-4 rounded-top-4"
          style={{ backgroundColor: "var(--dark-surface-2)" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="text-white mb-1">Pedido</h4>
              <p className="text-secondary mb-0" style={{ fontSize: "0.9rem" }}>
                #{pedido.pago_id}
              </p>
            </div>
            <span
              className={`badge rounded-pill px-3 py-2 ${getStatusBadgeClass(
                pedido.estatus
              )}`}
              style={{ fontSize: "0.85rem" }}
            >
              {pedido.estatus.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="card-body p-4">
          {/* Info General */}
          <div className="row g-4 mb-4">
            <div className="col-md-12">
              <div
                className="p-3 rounded-3"
                style={{ backgroundColor: "var(--dark-surface-2)" }}
              >
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-calendar3 me-2 text-secondary"></i>
                  <p className="text-white mb-0">
                    {new Date(pedido.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-credit-card me-2 text-secondary"></i>
                  <p className="text-white mb-0">
                    Total: ${pedido.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Productos */}
          <h5 className="text-white mb-3">Detalle del Pedido</h5>
          <div className="rounded-3 overflow-hidden">
            {pedido.productos.map((producto, index) => (
              <div
                key={producto.producto_id}
                className="p-3"
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "var(--dark-surface-2)" : "transparent",
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-white mb-2">{producto.nombre}</h6>
                    <div className="d-flex align-items-center mb-2">
                      <span
                        className="badge rounded-pill me-2"
                        style={{ backgroundColor: "var(--accent-color)" }}
                      >
                        ×{producto.cantidad}
                      </span>
                      <span className="text-secondary">
                        ${producto.precio.toFixed(2)} c/u
                      </span>
                    </div>

                    {producto.personalizaciones?.extras.length > 0 && (
                      <div className="mt-2">
                        <div className="d-flex flex-wrap gap-2">
                          {producto.personalizaciones.extras.map((extra) => (
                            <span
                              key={extra.id}
                              className="badge rounded-pill px-2 py-1"
                              style={{
                                backgroundColor: "var(--dark-surface)",
                                color: "var(--text-secondary)",
                                fontSize: "0.8rem",
                              }}
                            >
                              {getNombreIngrediente(extra.id)}
                              {extra.cantidad > 1 ? ` ×${extra.cantidad}` : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-white fw-bold">
                    ${(producto.precio * producto.cantidad).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer border-0 p-4">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="btn btn-outline-light rounded-pill px-4">
              <i className="bi bi-arrow-left me-2"></i>
              Volver
            </Link>
            <div className="text-end">
              <p className="text-secondary mb-1">Total del Pedido</p>
              <h4 className="mb-0" style={{ color: "var(--accent-color)" }}>
                ${pedido.total.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoPage;
