import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useIngredientes } from "../context/IngredientesContext";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productService";
import { IProducto, Ingrediente, ExtraSeleccionado } from "../types/IProducto";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const { ingredientes, cargando } = useIngredientes();
    const { agregarAlCarrito } = useCart();
    const [product, setProduct] = useState<IProducto | null>(null);
    const [cant, setCant] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [extrasSeleccionados, setExtrasSeleccionados] = useState<
        ExtraSeleccionado[]
    >([]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getProductById(id)
                .then((data) => {
                    if (data) {
                        setProduct(data);
                    } else {
                        console.error("El producto no se encontró:", data);
                        setProduct(null);
                    }
                })
                .catch((error) =>
                    console.error("Error al obtener el producto:", error)
                )
                .finally(() => setLoading(false));
        }
    }, [id]);

    const ingredientesBase: Ingrediente[] = useMemo(() => {
        if (!product || !Array.isArray(product.ingredientes)) return [];

        return product.ingredientes
            .map((ing) => ingredientes.find((i) => i._id === ing.id))
            .filter((ing): ing is Ingrediente => ing !== undefined);
    }, [product, ingredientes]);

    const ingredientesExtras: Ingrediente[] = useMemo(() => {
        return Array.isArray(ingredientes)
            ? ingredientes.filter(
                  (ing) => ing.precioExtra && ing.precioExtra > 0
              )
            : []; // ✅ Devuelve un array vacío si `ingredientes` no es un array
    }, [ingredientes]);

    const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(
            1,
            Math.min(Number(e.target.value), product?.stock || 1)
        );
        setCant(value);
    };

    const toggleExtra = (extraId: string, precioExtra: number) => {
        setExtrasSeleccionados((prevExtras) => {
            const existe = prevExtras.find((extra) => extra.id === extraId);
            if (existe) {
                return prevExtras.filter((extra) => extra.id !== extraId);
            } else {
                return [...prevExtras, { id: extraId, cantidad: 1 }];
            }
        });
    };

    const handleAddToCart = () => {
        if (product) {
            agregarAlCarrito({
                ...product,
                cantidad: cant,
                personalizaciones: {
                    extras: extrasSeleccionados,
                    removidos: [],
                },
            });
        }
    };

    if (loading) return <p className="text-center">Cargando producto...</p>;
    if (!product)
        return (
            <p className="text-center text-danger">
                Error: No se encontró el producto.
            </p>
        );

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Imagen del producto */}
                <div className="col-md-6">
                    <img
                        src={product.imageUrl}
                        alt={product.nombre}
                        className="img-fluid rounded shadow"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>

                {/* Detalles del producto */}
                <div className="col-md-6">
                    <h1 className="mb-3">{product.nombre}</h1>
                    <p className="text-muted">{product.descripcion}</p>
                    <h3 className="text-success">
                        Precio: ${product.precio.toFixed(2)}
                    </h3>

                    {/* Ingredientes Base */}
                    {product.ingredientes?.length ? (
                        <>
                            <h4 className="mt-4">Ingredientes Base</h4>
                            <ul className="list-group">
                                {ingredientesBase.map((ing) => (
                                    <li
                                        key={ing._id}
                                        className="list-group-item"
                                    >
                                        {ing.nombre}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-secondary mt-3">
                            Este producto no tiene ingredientes.
                        </p>
                    )}

                    {/* Extras Opcionales */}
                    {ingredientesExtras.length > 0 && (
                        <>
                            <h4 className="mt-4">Añadir Extras</h4>
                            <ul className="list-group">
                                {ingredientesExtras.map((ing) => (
                                    <li
                                        key={ing._id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={ing._id}
                                                onChange={() =>
                                                    toggleExtra(
                                                        ing._id,
                                                        ing.precioExtra ?? 0
                                                    )
                                                }
                                                checked={extrasSeleccionados.some(
                                                    (extra) =>
                                                        extra.id === ing._id
                                                )}
                                            />
                                            <label
                                                className="form-check-label ms-2"
                                                htmlFor={ing._id}
                                            >
                                                {ing.nombre} (+$
                                                {ing.precioExtra?.toFixed(2)})
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {/* Selector de Cantidad */}
                    <div className="mt-4 d-flex align-items-center">
                        <input
                            type="number"
                            className="form-control me-2"
                            min="1"
                            value={cant}
                            onChange={handleCantidadChange}
                            style={{ width: "80px" }}
                        />
                        <button
                            className="btn btn-success btn-lg"
                            disabled={cant < 1 || cant > product.stock}
                            onClick={handleAddToCart}
                        >
                            🛒 Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
