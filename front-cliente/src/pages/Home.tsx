import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productService";
import { agruparPorCategoria } from "../helpers/functions";
import { SearchForm } from "../components/SearchForm";
import ProductCard from "../components/ProductCard";
import BurgerLoader from "../components/BurgerLoader";
import { Link } from "react-router-dom";
import Hero from "../components/home/Hero";

const Home: React.FC = () => {
  const [isLoadingArtificial, setIsLoadingArtificial] = useState(() => {
    return !localStorage.getItem("hasVisitedBefore");
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
        localStorage.setItem("hasVisitedBefore", "true");
      }, 1000);
    }
  }, [isLoadingQuery, isLoadingArtificial]);

  if (isLoadingQuery || isLoadingArtificial)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <BurgerLoader />
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center m-4" role="alert">
        Error al cargar productos. Intente nuevamente.
      </div>
    );

  return (
    <div style={{ backgroundColor: "var(--dark-bg)" }}>
      <Hero />

      <div className="container py-5">
        {/* Categorías */}
        {Object.entries(agruparPorCategoria(fetchedProducts)).map(
          ([categoria, productos]) => (
            <div key={categoria} className="mb-5">
              {/* Header de Categoría */}
              <div className="d-flex align-items-center mb-4">
                <div
                  className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "var(--dark-surface-2)",
                  }}
                >
                  {categoria === "hamburguesas" && "🍔"}
                  {categoria === "bebidas" && "🥤"}
                  {categoria === "postres" && "🍰"}
                </div>
                <h2 className="text-white mb-0 h3">
                  {categoria.toUpperCase()}
                </h2>
              </div>

              {/* Grid de Productos */}
              <div className="row g-4">
                {productos.map((producto) => (
                  <div key={producto._id} className="col-sm-6 col-lg-4">
                    <ProductCard producto={producto} />
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* FAB del carrito */}
      <div
        className="position-fixed bottom-0 end-0 m-4"
        style={{ zIndex: 1000 }}
      >
        <Link
          to="/carrito"
          className="btn btn-lg rounded-circle shadow-lg d-flex align-items-center justify-content-center"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "var(--accent-color)",
            border: "none",
          }}
        >
          <i className="bi bi-cart-fill text-white fs-4"></i>
        </Link>
      </div>
    </div>
  );
};

export default Home;
