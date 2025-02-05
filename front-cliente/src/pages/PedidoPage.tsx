import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";

interface Pedido {
    _id: string;
    usuario_id: string;
    direccion_id: string;
    estatus: string;
    productos: {
        producto_id: string;
        nombre: string;
        cantidad: number;
        precio: number;
        personalizaciones: {
            extras: { id: string; cantidad: number }[];
            removidos: { id: string }[];
        };
    }[];
    total: number;
    pago_id: string;
    createdAt: string;
    updatedAt: string;
}

const Pedido = () => {
    const { id } = useParams();
    const [pedido, setPedido] = useState<Pedido | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerPedido = async () => {
            try {
                const data = await getOrderById(id ?? " ");
                setPedido(data);
            } catch (error) {
                console.error("Error al obtener el pedido:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerPedido();
    }, [id]);

    if (loading) return <p>Cargando pedido...</p>;
    if (!pedido) return <p>No se encontró el pedido.</p>;

    return (
        <div className="container mt-4">
            <h1 className="mb-3">Pedido #{pedido._id}</h1>
            <p>
                <strong>Estado:</strong>{" "}
                <span
                    className={`${
                        pedido.estatus === "confirmado" ? "text-success" : ""
                    }${pedido.estatus === "pendiente" ? "text-warning" : ""}${
                        pedido.estatus === "cancelado" ? "text-danger" : ""
                    }
`}
                >
                    {pedido.estatus.toUpperCase()}
                </span>
            </p>
            <p>
                <strong>Total:</strong> ${pedido.total.toFixed(2)}
            </p>
            <p>
                <strong>Fecha de creación:</strong>{" "}
                {new Date(pedido.createdAt).toLocaleString()}
            </p>

            <h2 className="mt-4">Productos</h2>
            <ul className="list-group">
                {pedido.productos.map((producto) => (
                    <li key={producto.producto_id} className="list-group-item">
                        <h5>{producto.nombre}</h5>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Precio: ${producto.precio.toFixed(2)}</p>

                        {producto.personalizaciones?.extras.length > 0 && (
                            <div>
                                <strong>Extras:</strong>
                                <ul>
                                    {producto.personalizaciones.extras.map(
                                        (extra, index) => (
                                            <li key={index}>
                                                Extra ID: {extra.id} (Cantidad:{" "}
                                                {extra.cantidad})
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}

                        {producto.personalizaciones?.removidos.length > 0 && (
                            <div>
                                <strong>Removidos:</strong>
                                <ul>
                                    {producto.personalizaciones.removidos.map(
                                        (removido, index) => (
                                            <li key={index}>
                                                Removido ID: {removido.id}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Link to={"/"}>Ir al Home</Link>
        </div>
    );
};

export default Pedido;
