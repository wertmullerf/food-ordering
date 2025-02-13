import { Link } from "react-router-dom";

export const CartIcon = () => {
  return (
    <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1000 }}>
      <Link
        to="/carrito"
        className="btn btn-lg rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "var(--accent-color)",
          border: "none",
        }}
      >
        <i className="bi bi-cart-fill text-white fs-4"></i>
      </Link>
    </div>
  );
};
