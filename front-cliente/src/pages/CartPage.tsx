// pages/CartPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/product";

const CartPage: React.FC = () => {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    totalCarrito,
    itemsEnCarrito,
  } = useCart();

  const handleActualizarCantidad = (id: string, cantidad: number) => {
    const item = carrito.find((i) => i._id === id);
    if (item && cantidad > item.stock) {
      alert(`No hay suficiente stock. Máximo disponible: ${item.stock}`);
      return;
    }
    actualizarCantidad(id, cantidad);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Tu Carrito 🛒</h1>

      {itemsEnCarrito === 0 ? (
        <div className="text-center">
          <p className="lead">Tu carrito está vacío</p>
          <Link to="/" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {carrito.map((item: CartItem) => (
              <div key={item._id} className="card mb-3 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.imageUrl}
                      alt={item.nombre}
                      className="img-fluid rounded-start"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.nombre}</h5>
                      <p className="card-text text-muted">{item.descripcion}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="input-group" style={{ width: "140px" }}>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              handleActualizarCantidad(
                                item._id,
                                item.cantidad - 1
                              )
                            }
                            disabled={item.cantidad <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control text-center"
                            min="1"
                            max={item.stock}
                            value={item.cantidad}
                            onChange={(e) =>
                              handleActualizarCantidad(
                                item._id,
                                Math.max(
                                  1,
                                  Math.min(Number(e.target.value), item.stock)
                                )
                              )
                            }
                          />
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              handleActualizarCantidad(
                                item._id,
                                item.cantidad + 1
                              )
                            }
                            disabled={item.cantidad >= item.stock}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-end">
                          <h5 className="mb-0">
                            ${(item.precio * item.cantidad).toFixed(2)}
                          </h5>
                          <small className="text-muted">
                            ${item.precio.toFixed(2)} c/u
                          </small>
                        </div>
                      </div>
                      <button
                        onClick={() => eliminarDelCarrito(item._id)}
                        className="btn btn-danger mt-3"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "1rem" }}>
              <div className="card-body">
                <h4 className="card-title mb-4">Resumen de Compra</h4>
                <dl className="row">
                  <dt className="col-6">Productos:</dt>
                  <dd className="col-6 text-end">{itemsEnCarrito}</dd>

                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-end h4 text-primary">
                    ${totalCarrito.toFixed(2)}
                  </dd>
                </dl>
                <div className="d-grid gap-2">
                  <Link
                    to="/checkout"
                    className="btn btn-primary btn-lg"
                    role="button"
                  >
                    Finalizar Compra
                  </Link>
                  <Link
                    to="/"
                    className="btn btn-outline-secondary"
                    role="button"
                  >
                    Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
