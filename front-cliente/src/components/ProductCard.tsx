import React from 'react';
import { IProducto } from "../types/IProducto";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    producto: IProducto;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto }) => {
    const navigate = useNavigate();

    return (
        <div 
            className="card h-100 hover-dark"
            style={{ 
                backgroundColor: 'var(--dark-surface)',
                border: 'none',
                cursor: 'pointer'
            }}
            onClick={() => navigate(`/producto/${producto._id}`)}
        >
            <img
                src={producto.imageUrl}
                className="card-img-top"
                alt={producto.nombre}
                style={{
                    height: '200px',
                    objectFit: 'cover'
                }}
            />
            <div className="card-body d-flex flex-column p-3">
                <h5 className="card-title text-white fw-bold mb-2">
                    {producto.nombre}
                </h5>
                <p className="card-text text-secondary small mb-2" style={{ fontSize: '0.9rem' }}>
                    {producto.descripcion}
                </p>
                <div className="mt-auto">
                    <span 
                        className="fs-4 fw-bold"
                        style={{ color: 'var(--accent-color)' }}
                    >
                        ${producto.precio.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
