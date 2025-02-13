import React from "react";
import "./CheckoutButton.css";

interface Props {
  total: number;
  isLoading?: boolean;
  onClick?: () => void;
}

const CheckoutButton: React.FC<Props> = ({ total, isLoading, onClick }) => {
  return (
    <button className="checkout-button" onClick={onClick} disabled={isLoading}>
      <div className="checkout-container">
        <div className="checkout-left-side">
          <div className="checkout-card">
            <div className="checkout-card-line" />
            <div className="checkout-buttons" />
          </div>
          <div className="checkout-post">
            <div className="checkout-post-line" />
            <div className="checkout-screen">
              <div className="checkout-dollar">$</div>
            </div>
            <div className="checkout-numbers" />
            <div className="checkout-numbers-line2" />
          </div>
        </div>
        <div className="checkout-right-side">
          {isLoading ? (
            <span className="spinner-border spinner-border-sm" role="status" />
          ) : (
            <span className="checkout-text">
              Proceder al Pago (${total.toFixed(2)})
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default CheckoutButton;
