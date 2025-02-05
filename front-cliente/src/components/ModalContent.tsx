import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ModalContent = () => {
    const [pedidoId, setPedidoId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        redirigirPedido();
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        redirigirPedido();
    };

    const redirigirPedido = () => {
        if (pedidoId.trim() !== "") {
            navigate(`/pedido/${pedidoId}`);
        }
    };

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                {/* Encabezado del modal */}
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Busca tu Pedido 🍔
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="pedidoId"
                                placeholder="Ingresá el ID del Pedido"
                                value={pedidoId}
                                onChange={(e) => setPedidoId(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        {/* Botón con onClick */}
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={handleButtonClick}
                            data-bs-dismiss="modal"
                        >
                            Buscar Pedido 🔍
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
