import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import { agruparPorCategoria } from "../helpers/functions";
import { SearchForm } from "../components/SearchForm";
import ProductCard from "../components/ProductCard";
import BurgerLoader from "../components/BurgerLoader";

const Home: React.FC = () => {
    const [isLoadingArtificial, setIsLoadingArtificial] = useState(() => {
        return !localStorage.getItem('hasVisitedBefore');
    });

    const {
        data: fetchedProducts = [],
        isLoading: isLoadingQuery,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 3,
    });

    useEffect(() => {
        if (!isLoadingQuery && isLoadingArtificial) {
            setTimeout(() => {
                setIsLoadingArtificial(false);
                localStorage.setItem('hasVisitedBefore', 'true');
            }, 1000);
        }
    }, [isLoadingQuery, isLoadingArtificial]);

    if (isLoadingQuery || isLoadingArtificial) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <BurgerLoader />
        </div>
    );

    
    if (error) return (
        <div className="alert alert-danger text-center m-4" role="alert">
            Error al cargar productos. Intente nuevamente.
        </div>
    );

    return (
        <div className="container-fluid py-5">
            <div className="row justify-content-center mb-5">
                <div className="col-12 col-md-8 col-lg-6">
                    <SearchForm />
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                    {Object.entries(agruparPorCategoria(fetchedProducts)).map(
                        ([categoria, productos]) => (
                            <div key={categoria} className="mb-5">
                                <h2 className="text-white mb-4">
                                    {categoria.toUpperCase()}
                                </h2>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                    {productos.map((producto) => (
                                        <div key={producto._id} className="col">
                                            <ProductCard producto={producto} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
