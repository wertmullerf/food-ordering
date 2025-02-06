import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import ProductTable from "../components/ProductTable";
import { agruparPorCategoria, capitalize } from "../helpers/functions";
import "./Home.css";
import { SearchForm } from "../components/SearchForm";

const Home: React.FC = () => {
    // Fetch de productos con react-query
    const {
        data: fetchedProducts = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5, // Cache de 5 minutos
        refetchOnMount: false, // 🚀 **No hacer refetch al montar (evita doble carga)**
        refetchOnWindowFocus: false, // Evita recarga automática al cambiar de ventana
        retry: 3, // **🚀 Intenta 3 veces si hay error en la API**
    });

    if (isLoading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos. Intente nuevamente.</p>;

    return (
        <div className="container mt-4">
            <SearchForm />
            <h2 className="mb-3 text-center">Lista de Productos 🍔</h2>

            <div className="table-responsive">
                {Object.entries(agruparPorCategoria(fetchedProducts)).map(
                    ([categoria, items]) => (
                        <ProductTable
                            key={categoria}
                            categoria={categoria}
                            productos={items}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Home;
