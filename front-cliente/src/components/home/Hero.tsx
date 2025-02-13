import React from "react";
import { SearchForm } from "../SearchForm";
import heroImage from "../../assets/burger-hero-2.png";

const Hero: React.FC = () => {
  return (
    <div className="hero-section position-relative overflow-hidden">
      <div
        className="py-5"
        style={{
          background: "var(--dark-surface)",
        }}
      >
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            {/* Texto */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="pe-lg-5">
                <div className="mb-4">
                  <span
                    className="badge rounded-pill px-3 py-2 mb-3"
                    style={{
                      backgroundColor: "var(--accent-color)",
                      opacity: 0.9,
                    }}
                  >
                    🔥 Nueva Temporada
                  </span>
                  <h1 className="display-2 fw-bold text-white">
                    Burger
                    <span style={{ color: "var(--accent-color)" }}> House</span>
                  </h1>
                </div>

                <p className="lead text-secondary mb-4">
                  Descubre el verdadero sabor de una hamburguesa artesanal
                </p>

                <div className="mb-4">
                  <SearchForm />
                </div>

                <div className="d-flex align-items-center gap-4 text-white-50">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-clock"></i>
                    <span>Abierto: 11:00 - 23:00</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-geo-alt"></i>
                    <span>Envíos sin cargo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="col-lg-6 position-relative">
              <div className="hero-image-container mt-5">
                <img
                  src={heroImage}
                  alt="Hamburguesa"
                  className="w-100"
                  style={{
                    maxHeight: "500px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div
          className="position-absolute top-0 end-0"
          style={{
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, var(--accent-color) 0%, transparent 70%)",
            opacity: 0.1,
            transform: "translate(20%, -50%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="position-absolute bottom-0 start-0"
          style={{
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, var(--accent-color) 0%, transparent 70%)",
            opacity: 0.1,
            transform: "translate(-20%, 50%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
