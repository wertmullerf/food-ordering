import React, { useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/IProducto";
import "./Home.css";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { agruparPorCategoria, capitalize } from "../helpers/functions";
import { SearchForm } from "../components/SearchForm";

const Home: React.FC = () => {
    const location = useLocation();

    const {
        data: fetchedProducts = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const data = await getProducts();
            return data;
        },
        staleTime: 1000 * 60 * 5, // Cache de 5 minutos (evita refetch innecesario)
        refetchOnMount: true, // Se asegura de hacer un fetch al montar
        refetchOnWindowFocus: false, // No recarga datos cuando se vuelve a la ventana
        retry: 2, // Intenta 2 veces si hay un error en la API
    });
    // Forzar actualización al cambiar de ruta (si lo necesitas)
    useEffect(() => {
        refetch();
    }, [location.key, refetch]);

    if (isLoading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos</p>;

    return (
        <div className="container mt-4">
            <SearchForm />
            <h2 className="mb-3 text-center">Lista de Productos 🍔</h2>
            <div className="table-responsive">
                {Object.entries(agruparPorCategoria(fetchedProducts)).map(
                    ([categoria, items]) => (
                        <div key={categoria}>
                            <h3 className="mt-4">{capitalize(categoria)}</h3>
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
