// components/CartFooter.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartFooter: React.FC = () => {
    const { itemsEnCarrito, totalCarrito } = useCart();

    return (
        <footer className="fixed-bottom bg-dark text-white py-3 shadow-lg">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        <h5 className="mb-0">🛒 Tu Carrito</h5>
                        <span className="badge bg-danger rounded-pill">
                            {itemsEnCarrito}{" "}
                            {itemsEnCarrito === 1 ? "ítem" : "ítems"}
                        </span>
                    </div>

                    <div className="d-flex align-items-center gap-4">
                        <h4 className="mb-0 text-success">
                            Total: ${totalCarrito.toFixed(2)}
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
