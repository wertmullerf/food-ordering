import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartFooter: React.FC = () => {
    const { itemsEnCarrito, totalCarrito } = useCart();

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

    return (
        <footer className="fixed-bottom bg-dark text-white py-3 shadow-lg">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Íconos y contador de ítems en carrito */}
                    <div className="d-flex align-items-center gap-3">
                        <h5 className="mb-0">🛒 Tu Carrito</h5>
                        <span className="badge bg-danger rounded-pill">
                            {itemsEnCarrito}{" "}
                            {itemsEnCarrito === 1 ? "ítem" : "ítems"}
                        </span>
                    </div>

                    {/* Total y botón para ir al carrito */}
                    <div className="d-flex align-items-center gap-4">
                        <h4 className="mb-0 text-success">
                            Total: {formattedTotal}
                        </h4>
                        <Link to="/carrito" className="btn btn-primary btn-lg">
                            Ver Carrito
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default CartFooter;
