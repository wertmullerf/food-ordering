import { useState } from "react";

const OrderModal = () => {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!orderId) {
      setError("Por favor, ingresa un código de pedido.");
      return;
    }
    setError(null);

    // Redirigir a la página del pedido
    window.location.href = `/pedido/${orderId}`;
  };

  return (
    <>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#orderModal"
      >
        Buscar Pedido
      </button>

      <div
        className="modal fade"
        id="orderModal"
        tabIndex={-1}
        aria-labelledby="orderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderModalLabel">
                Buscar Pedido
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese el código del pedido"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />

              {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSearch}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
