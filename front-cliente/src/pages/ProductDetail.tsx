import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { CartItem } from "../types/IProducto";
import { useCart } from "../context/CartContext";
import { useIngredientes } from "../context/IngredientesContext";
import BurgerLoader from "../components/BurgerLoader";
import { ProductImage } from "../components/product/ProductImage";
import { ProductExtras } from "../components/product/ProductExtras";
import { QuantitySelector } from "../components/product/QuantitySelector";
import { replaceLocalhost } from "../config";
import { CartIcon } from "../components/CartIcon";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<CartItem | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCart();
  const { ingredientesExtras } = useIngredientes();
  const [isLoading, setIsLoading] = useState(true);

  const [extrasSeleccionados, setExtrasSeleccionados] = useState<
    { id: string; cantidad: number; precio: number }[]
  >([]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getProductById(id)
        .then((data) => {
          if (data) {
            setProduct({
              ...data,
              _id: data._id ?? "",
              cantidad: 1,
            });
          }
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000);
        });
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExtrasChange = (extraId: string, precio: number) => {
    setExtrasSeleccionados((prev) =>
      prev.some((e) => e.id === extraId)
        ? prev.filter((e) => e.id !== extraId)
        : [...prev, { id: extraId, cantidad: 1, precio }]
    );
  };

  const calcularPrecioTotal = () => {
    const precioBase = product?.precio || 0;
    const precioExtras = extrasSeleccionados.reduce(
      (acc, extra) => acc + extra.precio * extra.cantidad,
      0
    );
    return precioBase + precioExtras;
  };

  const handleAddToCart = () => {
    if (product) {
      agregarAlCarrito({
        ...product,
        cantidad,
        personalizaciones: {
          extras: extrasSeleccionados.map((extra) => ({
            id: extra.id,
            cantidad: extra.cantidad,
          })),
          removidos: [],
        },
      });
    }
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <BurgerLoader />
      </div>
    );

  if (!product)
    return <p className="text-center mt-5">Producto no encontrado</p>;

  return (
    <div
      className="min-vh-100 pt-4"
      style={{ backgroundColor: "var(--dark-bg)" }}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <ProductImage
              imageUrl={replaceLocalhost(product.imageUrl)}
              nombre={product.nombre}
            />
          </div>

          <div className="col-md-6">
            <div
              className="p-4 rounded-4"
              style={{ backgroundColor: "var(--dark-surface)" }}
            >
              <h1 className="display-5 fw-bold text-white mb-3">
                {product.nombre}
              </h1>
              <p className="lead text-secondary mb-4">{product.descripcion}</p>

              <div className="mb-4">
                <h4
                  className="fs-2 fw-bold"
                  style={{ color: "var(--accent-color)" }}
                >
                  ${product.precio.toFixed(2)}
                </h4>
              </div>

              {product.categoria.toLowerCase() === "hamburguesas" &&
                ingredientesExtras.length > 0 && (
                  <ProductExtras
                    extras={ingredientesExtras
                      .filter((i) => i.precioExtra !== undefined)
                      .map((i) => ({ ...i, precioExtra: i.precioExtra! }))}
                    onExtraChange={handleExtrasChange}
                  />
                )}

              <div className="d-flex align-items-center gap-4 mb-4">
                <QuantitySelector
                  cantidad={cantidad}
                  onDecrease={() =>
                    setCantidad((prev) => Math.max(1, prev - 1))
                  }
                  onIncrease={() => setCantidad((prev) => prev + 1)}
                />
                <h4 className="mb-0" style={{ color: "var(--accent-color)" }}>
                  Total: ${(calcularPrecioTotal() * cantidad).toFixed(2)}
                </h4>
              </div>

              <button
                className="btn btn-lg w-100 py-3"
                style={{
                  backgroundColor: "var(--accent-color)",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                }}
                onClick={handleAddToCart}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <CartIcon /> */}
    </div>
  );
};

export default ProductDetail;
