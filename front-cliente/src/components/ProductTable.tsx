import React from "react";
import { capitalize } from "../helpers/functions";
import ProductCard from "./ProductCard";
import { IProducto } from "../types/IProducto";

interface ProductTableProps {
    categoria: string;
    productos: IProducto[];
}

const ProductTable: React.FC<ProductTableProps> = ({
    categoria,
    productos,
}) => {
    return (
        <div>
            <h3 className="mt-4">{capitalize(categoria)}</h3>
            <table className="table table-striped">
                <tbody>
                    {productos.map((producto) => (
                        <ProductCard key={producto._id} producto={producto} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
