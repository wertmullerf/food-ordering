import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import "./Home.css";

const agruparPorCategoria = (
    productos: Product[]
): Record<string, Product[]> => {
    return productos.reduce((acc, producto) => {
        acc[producto.categoria] = acc[producto.categoria] || [];
        acc[producto.categoria].push(producto);
        return acc;
    }, {} as Record<string, Product[]>);
};

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts()
            .then((data) => {
                console.log(data); // ✅ Mostrar directamente los productos
                setProducts(data);
            })
            .catch((error) =>
                console.error("Error al obtener productos:", error)
            );
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3 text-center">Lista de Productos 🍔</h2>
            <div className="table-responsive">
                {Object.entries(agruparPorCategoria(products)).map(
                    ([categoria, items]) => (
                        <div key={categoria}>
                            <h3 className="mt-4">{categoria}</h3>
                            <table className="table table-striped">
                                <tbody>
                                    {items.map((producto) => (
                                        <ProductCard
                                            key={producto._id}
                                            producto={producto}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Home;
