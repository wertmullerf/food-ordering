// pages/CartPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/IProducto";
import { QuantitySelector } from "../components/product/QuantitySelector";

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
    <div className="min-vh-100 py-4" style={{ backgroundColor: 'var(--dark-bg)' }}>
      <div className="container">
        <h1 className="mb-4 text-white">Tu Carrito 🛒</h1>

        {itemsEnCarrito === 0 ? (
          <div className="text-center p-5" style={{ backgroundColor: 'var(--dark-surface)', borderRadius: '1rem' }}>
            <p className="lead text-white mb-4">Tu carrito está vacío</p>
            <Link 
              to="/" 
              className="btn btn-lg px-4"
              style={{ 
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                borderRadius: '50px'
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
                  className="mb-4 p-4 rounded-4"
                  style={{ backgroundColor: 'var(--dark-surface)' }}
                >
                  <div className="row g-4">
                    <div className="col-md-4">
                      <img
                        src={item.imageUrl}
                        alt={item.nombre}
                        className="rounded-4 w-100"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <h5 className="text-white mb-2">{item.nombre}</h5>
                      <p className="text-secondary mb-3">{item.descripcion}</p>
                      
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <QuantitySelector
                          cantidad={item.cantidad}
                          onDecrease={() => handleActualizarCantidad(item._id, item.cantidad - 1)}
                          onIncrease={() => handleActualizarCantidad(item._id, item.cantidad + 1)}
                        />
                        <div className="text-end">
                          <h5 className="mb-1" style={{ color: 'var(--accent-color)' }}>
                            ${(item.precio * item.cantidad).toFixed(2)}
                          </h5>
                          <small className="text-secondary">
                            ${item.precio.toFixed(2)} c/u
                          </small>
                        </div>
                      </div>

                      <button
                        onClick={() => eliminarDelCarrito(item._id)}
                        className="btn mt-3"
                        style={{ 
                          backgroundColor: 'var(--dark-surface-2)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div 
                className="p-4 rounded-4 sticky-top"
                style={{ 
                  backgroundColor: 'var(--dark-surface)',
                  top: "2rem"
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
                    <span className="h4 mb-0" style={{ color: 'var(--accent-color)' }}>
                      ${totalCarrito.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="d-grid gap-3">
                  <Link
                    to="/checkout"
                    className="btn btn-lg"
                    style={{ 
                      backgroundColor: 'var(--accent-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50px'
                    }}
                  >
                    Finalizar Compra
                  </Link>
                  <Link
                    to="/"
                    className="btn btn-lg"
                    style={{ 
                      backgroundColor: 'var(--dark-surface-2)',
                      color: 'var(--text-secondary)',
                      border: 'none',
                      borderRadius: '50px'
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
