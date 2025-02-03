import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { Product } from "../types/product";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) getProductById(id).then(setProduct);
    }, [id]);

    if (!product) return <p>Cargando...</p>;

    return (
        <div className="d-flex flex-column">
            <h1>{product.nombre}</h1>
            <img src={product.imageUrl} alt={product.nombre} />
            {/* <p>{product.description}</p> */}
            <button className="btn btn-success">Añadir al carrito</button>
        </div>
    );
};

export default ProductDetail;
