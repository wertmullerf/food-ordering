// pages/CartPage.tsx
import React from "react";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
    const { carrito, eliminarDelCarrito, actualizarCantidad, totalCarrito } =
        useCart();

    const handleEliminar = (id: string) => {
        eliminarDelCarrito(id);
    };

    const handleActualizarCantidad = (id: string, cantidad: number) => {
        if (cantidad < 1) return; // Evitar cantidades negativas
        actualizarCantidad(id, cantidad);
    };

    return (
        <div>
            <h1>Carrito</h1>
            <div>
                {carrito.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                ) : (
                    carrito.map((item) => (
                        <div key={item.id}>
                            <h3>{item.nombre}</h3>
                            <p>Precio: ${item.precio}</p>
                            <input
                                type="number"
                                value={item.cantidad}
                                onChange={(e) =>
                                    handleActualizarCantidad(
                                        item.id,
                                        Number(e.target.value)
                                    )
                                }
                            />
                            <button onClick={() => handleEliminar(item.id)}>
                                Eliminar
                            </button>
                        </div>
                    ))
                )}
            </div>
            <h3>Total: ${totalCarrito}</h3>
        </div>
    );
};

export default CartPage;
