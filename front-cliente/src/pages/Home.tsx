import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import "./Home.css";
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
        // <div>
        //     <h1>Nuestras Burgers 🍔</h1>
        //     <div>
        //         {products.map((product) => (
        //             <ProductCard  key={product._id} product={product} />
        //         ))}
        //     </div>
        // </div>
        <div className="container mt-4">
            <h2 className="mb-3 text-center ">Lista de Productos 🍔</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <tbody>
                        {products.map((producto) => (
                            <ProductCard
                                key={producto._id}
                                producto={producto}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
