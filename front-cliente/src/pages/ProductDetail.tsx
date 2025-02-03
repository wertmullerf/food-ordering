// ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { Product } from "../types/product";
import { useCart } from "../context/CartContext"; // Importa el contexto

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [cant, setCant] = useState(1); // Establecemos el valor mínimo como 1

    const { agregarAlCarrito } = useCart(); // Obtén la función para agregar al carrito

    useEffect(() => {
        if (id) getProductById(id).then(setProduct);
    }, [id]);

    if (!product) return <p>Cargando...</p>;

    const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, parseInt(e.target.value)); // Aseguramos que no sea menor a 1
        setCant(value);
    };

    const handleAddToCart = () => {
        if (product) {
            agregarAlCarrito({
                id: product._id,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: cant,
            });
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <img
                src={product.imageUrl}
                alt={product.nombre}
                className="img-fluid"
                style={{ maxWidth: "600px", marginBottom: "20px" }}
            />
            <h1>{product.nombre}</h1>
            <p>{product.descripcion}</p>
            <div className="d-flex">
                <strong style={{ marginRight: "8px" }}>
                    ${product.precio.toFixed(2)}
                </strong>
                {product.stock === 0 && (
                    <strong className="text-danger text-decoration-underline">
                        Sin Stock
                    </strong>
                )}
            </div>
            <div className="d-flex align-items-center mt-3">
                <input
                    type="number"
                    className="form-control me-2"
                    min="1"
                    value={cant}
                    onChange={handleCantidadChange}
                    style={{ width: "70px" }}
                />
                <button
                    className="btn btn-success btn-pill"
                    disabled={cant < 1 || cant > product.stock} // Deshabilita el botón si la cantidad es menor a 1
                    onClick={handleAddToCart} // Llama a la función al hacer clic
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
