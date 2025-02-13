// pages/CartPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/IProducto";
import { QuantitySelector } from "../components/product/QuantitySelector";
import { useIngredientes } from "../context/IngredientesContext";
import { replaceLocalhost } from "../config";

const CartPage: React.FC = () => {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    totalCarrito,
    itemsEnCarrito,
  } = useCart();
  const { ingredientesExtras } = useIngredientes();

  const handleActualizarCantidad = (
    id: string,
    cantidad: number,
    personalizaciones?: any
  ) => {
    const item = carrito.find(
      (i) =>
        i._id === id &&
        JSON.stringify(i.personalizaciones || {}) ===
          JSON.stringify(personalizaciones || {})
    );

    if (!item) return;

    // Si es una disminución de cantidad, permitirla siempre
    if (cantidad < item.cantidad) {
      actualizarCantidad(id, cantidad, personalizaciones);
      return;
    }

    // Si es un aumento y no hay stock, mostrar error
    if (!item.stock) {
      alert(`No hay suficiente stock disponible`);
      return;
    }

    actualizarCantidad(id, cantidad, personalizaciones);
  };

  const calcularPrecioConExtras = (item: CartItem) => {
    let precioTotal = item.precio;

    if (item.personalizaciones?.extras) {
      const precioExtras = item.personalizaciones.extras.reduce(
        (acc, extra) => {
          const ingrediente = ingredientesExtras.find(
            (ing) => ing._id === extra.id
          );
          return acc + (ingrediente?.precioExtra || 0) * extra.cantidad;
        },
        0
      );
      precioTotal += precioExtras;
    }

    return precioTotal;
  };

  // Función auxiliar para obtener el nombre del ingrediente y su precio
  const getIngredienteInfo = (id: string) => {
    const ingrediente = ingredientesExtras.find((ing) => ing._id === id);
    return {
      nombre: ingrediente?.nombre || "Ingrediente no encontrado",
      precioExtra: ingrediente?.precioExtra || 0,
    };
  };
  return (
    <div
      className="min-vh-100 py-4"
      style={{ backgroundColor: "var(--dark-bg)" }}
    >
      <div className="container">
        <h1 className="mb-4 text-white">Tu Carrito 🛒</h1>

        {itemsEnCarrito === 0 ? (
          <div
            className="text-center p-5"
            style={{
              backgroundColor: "var(--dark-surface)",
              borderRadius: "1rem",
            }}
          >
            <p className="lead text-white mb-4">Tu carrito está vacío</p>
            <Link
              to="/"
              className="btn btn-lg px-4"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
                border: "none",
                borderRadius: "50px",
              }}
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {carrito.map((item: CartItem) => (
                <div
                  key={item._id}
                  className="mb-4 p-4 rounded-4 shadow-sm"
                  style={{
                    backgroundColor: "var(--dark-surface)",
                    transition: "all 0.2s ease-in-out",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="position-relative">
                        <img
                          src={replaceLocalhost(item.imageUrl)}
                          alt={item.nombre}
                          className="rounded-4 w-100"
                          style={{
                            height: "200px",
                            objectFit: "cover",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="d-flex flex-column h-100">
                        <h5 className="text-white mb-2 fw-bold">
                          {item.nombre}
                        </h5>
                        <p
                          className="text-secondary mb-3"
                          style={{ fontSize: "0.95rem" }}
                        >
                          {item.descripcion}
                        </p>
                        {item.personalizaciones &&
                          Array.isArray(item.personalizaciones.extras) &&
                          item.personalizaciones.extras.length > 0 && (
                            <p
                              className="text-secondary mb-3"
                              style={{ fontSize: "0.95rem" }}
                            >
                              Extras:{" "}
                              {item.personalizaciones.extras.map(
                                (extra, index) => {
                                  const ingrediente = ingredientesExtras.find(
                                    (ing) => ing._id === extra.id
                                  );
                                  return (
                                    <span
                                      key={`${item._id}-${extra.id}-${index}`}
                                    >
                                      {ingrediente?.nombre ||
                                        "Extra no encontrado"}
                                      {extra.cantidad > 1
                                        ? ` (x${extra.cantidad})`
                                        : ""}
                                      {index <
                                      (item.personalizaciones?.extras?.length ||
                                        0) -
                                        1
                                        ? ", "
                                        : ""}
                                    </span>
                                  );
                                }
                              )}
                            </p>
                          )}

                        <div className="mt-auto">
                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                            <QuantitySelector
                              cantidad={item.cantidad}
                              onDecrease={() =>
                                handleActualizarCantidad(
                                  item._id,
                                  Math.max(0, item.cantidad - 1),
                                  item.personalizaciones
                                )
                              }
                              onIncrease={() =>
                                handleActualizarCantidad(
                                  item._id,
                                  item.cantidad + 1,
                                  item.personalizaciones
                                )
                              }
                            />
                            <div className="text-end">
                              <h5
                                className="mb-1 fw-bold"
                                style={{ color: "var(--accent-color)" }}
                              >
                                $
                                {(
                                  calcularPrecioConExtras(item) * item.cantidad
                                ).toFixed(2)}
                              </h5>
                              <small className="text-secondary">
                                ${calcularPrecioConExtras(item).toFixed(2)} c/u
                              </small>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              eliminarDelCarrito(
                                item._id,
                                item.personalizaciones
                              )
                            }
                            className="btn mt-3"
                            style={{
                              backgroundColor: "rgba(255, 59, 48, 0.1)",
                              color: "#ff3b30",
                              transition: "all 0.2s ease",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgba(255, 59, 48, 0.2)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "rgba(255, 59, 48, 0.1)";
                            }}
                          >
                            <i className="bi bi-trash3"></i> Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div
                className="p-4 rounded-4 sticky-top"
                style={{
                  backgroundColor: "var(--dark-surface)",
                  top: "2rem",
                }}
              >
                <h4 className="text-white mb-4">Resumen de Compra</h4>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-secondary">Productos:</span>
                    <span className="text-white">{itemsEnCarrito}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-secondary">Total:</span>
                    <span
                      className="h4 mb-0"
                      style={{ color: "var(--accent-color)" }}
                    >
                      ${totalCarrito.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="d-grid gap-3">
                  <Link
                    to="/checkout"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "var(--accent-color)",
                      color: "white",
                      border: "none",
                      borderRadius: "50px",
                    }}
                  >
                    Finalizar Compra
                  </Link>
                  <Link
                    to="/"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "var(--dark-surface-2)",
                      color: "var(--text-secondary)",
                      border: "none",
                      borderRadius: "50px",
                    }}
                  >
                    Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
