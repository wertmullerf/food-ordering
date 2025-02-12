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
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Pedido #{pedido._id}</h2>
            <span className={`badge ${getStatusBadgeClass(pedido.estatus)}`}>
              {pedido.estatus.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <p className="mb-1">
                <i className="bi bi-calendar-event me-2"></i>
                <strong>Fecha:</strong>{" "}
                {new Date(pedido.createdAt).toLocaleString()}
              </p>
              <p className="mb-1">
                <i className="bi bi-currency-dollar me-2"></i>
                <strong>Total:</strong> ${pedido.total.toFixed(2)}
              </p>
            </div>
          </div>

          <h3 className="mb-3">Productos</h3>
          <div className="list-group">
            {pedido.productos.map((producto) => (
              <div key={producto.producto_id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1">{producto.nombre}</h5>
                    <p className="mb-1 text-muted">
                      Cantidad: {producto.cantidad} × $
                      {producto.precio.toFixed(2)}
                    </p>

                    {producto.personalizaciones?.extras.length > 0 && (
                      <div className="mt-2">
                        <small className="text-muted">Extras:</small>
                        <ul className="list-unstyled ms-3 mb-0">
                          {producto.personalizaciones.extras.map((extra) => (
                            <li key={extra.id}>
                              <small>
                                • {getNombreIngrediente(extra.id)}
                                {extra.cantidad > 1
                                  ? ` (×${extra.cantidad})`
                                  : ""}
                              </small>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <span className="h5 mb-0">
                    ${(producto.precio * producto.cantidad).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="btn btn-outline-dark">
              <i className="bi bi-arrow-left me-2"></i>
              Volver al inicio
            </Link>
            <h4 className="mb-0">Total: ${pedido.total.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoPage;
