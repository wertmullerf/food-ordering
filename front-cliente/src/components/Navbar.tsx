// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const { itemsEnCarrito } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Mi Tienda
        </Link>
        <div className="d-flex">
          <Link
            to="/carrito"
            className="btn btn-outline-light position-relative"
          >
            🛒
            {itemsEnCarrito > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {itemsEnCarrito}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
