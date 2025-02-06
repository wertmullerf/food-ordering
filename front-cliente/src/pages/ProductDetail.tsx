import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useIngredientes } from "../context/IngredientesContext";

// 🔹 Definición de Tipos
interface Ingrediente {
    _id: string;
    nombre: string;
    precioExtra?: number;
    removible: boolean;
}

// 🔹 Nuevo Tipo para Ingredientes Base (que incluye cantidad)
interface IngredienteConCantidad extends Ingrediente {
    cantidad: number;
}

// 🔹 Tipado de los Extras Seleccionados
interface ExtraSeleccionado {
    id: string;
    cantidad: number;
}

// 🔹 Reducer para manejar los ingredientes extra seleccionados
const extrasReducer = (
    state: ExtraSeleccionado[],
    action: { type: string; payload: ExtraSeleccionado }
) => {
    switch (action.type) {
        case "AGREGAR":
            return [...state, action.payload];
        case "QUITAR":
            return state.filter((extra) => extra.id !== action.payload.id);
        default:
            return state;
    }
};

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const { ingredientes, extras, cargando } = useIngredientes();
    const { agregarAlCarrito } = useCart();

    const [product, setProduct] = useState<any | null>(null);
    const [cant, setCant] = useState<number>(1);
    const [removidos, setRemovidos] = useState<string[]>([]);
    const [extrasSeleccionados, dispatchExtras] = useReducer(extrasReducer, []);

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(setProduct)
                .catch((error) => console.error("Error:", error));
        }
    }, [id]);

    // 🔹 Mapea los ingredientes base obteniendo los datos completos
    const ingredientesBase: IngredienteConCantidad[] = useMemo(() => {
        if (!product || !product.ingredientes) return []; // 🛠️ Verificación para evitar errores

        return product.ingredientes
            .map((ing: { id: string; cantidad: number }) => {
                const ingredienteEncontrado = ingredientes.find(
                    (i) => i._id === ing.id
                );
                if (!ingredienteEncontrado) return null;

                return {
                    ...ingredienteEncontrado,
                    cantidad: ing.cantidad,
                };
            })
            .filter((ing: any) => ing !== null);
    }, [product, ingredientes]);

    // 🔹 Filtra los extras disponibles (excluyendo los que ya están en los ingredientes base)
    const extrasDisponibles = useMemo(() => {
        return extras.filter(
            (extra) => !ingredientesBase.some((base) => base._id === extra._id)
        );
    }, [extras, ingredientesBase]);

    const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(
            1,
            Math.min(Number(e.target.value), product?.stock || 1)
        );
        setCant(value);
    };

    const handleExtraChange = (id: string) => {
        dispatchExtras({
            type: extrasSeleccionados.some((extra) => extra.id === id)
                ? "QUITAR"
                : "AGREGAR",
            payload: { id, cantidad: 1 },
        });
    };

    const handleRemovidoChange = (id: string) => {
        setRemovidos((prev) =>
            prev.includes(id) ? prev.filter((rem) => rem !== id) : [...prev, id]
        );
    };

    const handleAddToCart = () => {
        if (product) {
            agregarAlCarrito({
                _id: product._id,
                nombre: product.nombre,
                precio: product.precio,
                stock: product.stock,
                categoria: product.categoria,
                descripcion: product.descripcion,
                costo: product.costo,
                imageUrl: product.imageUrl,
                cantidad: cant,
                personalizaciones: {
                    extras: extrasSeleccionados,
                    removidos: removidos,
                },
            });
        }
    };

    if (!product || cargando) return <p>Cargando...</p>;

    return (
        <div className="d-flex flex-column align-items-center">
            <img
                src={product.imageUrl}
                alt={product.nombre}
                className="img-fluid"
                style={{ maxWidth: "600px", marginBottom: "20px" }}
            />
            <h1>{product.nombre}</h1>
            <p>{product.descripcion}</p>

            <div className="d-flex">
                <strong style={{ marginRight: "8px" }}>
                    {new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                    }).format(product.precio)}
                </strong>
                {product.stock === 0 && (
                    <strong className="text-danger text-decoration-underline">
                        Sin Stock
                    </strong>
                )}
            </div>

            {/* 🔹 Ingredientes Base */}
            <h3 className="mt-4">Ingredientes Base</h3>
            {ingredientesBase.map((ing) => (
                <p key={ing._id}>
                    {ing.nombre} (x{ing.cantidad})
                </p>
            ))}

            {/* 🔹 Extras */}
            <h3 className="mt-4">Extras</h3>
            {extrasDisponibles.map((ing) => (
                <label key={ing._id} className="d-block">
                    <input
                        type="checkbox"
                        onChange={() => handleExtraChange(ing._id)}
                    />
                    {ing.nombre} (+
                    {new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                    }).format(ing.precioExtra || 0)}
                    )
                </label>
            ))}

            {/* 🔹 Removibles */}
            <h3 className="mt-4">Remover Ingredientes</h3>
            {ingredientesBase
                .filter((ing) => ing.removible)
                .map((ing) => (
                    <label key={ing._id} className="d-block">
                        <input
                            type="checkbox"
                            onChange={() => handleRemovidoChange(ing._id)}
                        />
                        {ing.nombre}
                    </label>
                ))}

            {/* 🔹 Cantidad y Botón de Agregar al Carrito */}
            <div className="d-flex align-items-center mt-3">
                <input
                    type="number"
                    className="form-control me-2"
                    min="1"
                    value={cant}
                    onChange={handleCantidadChange}
                    style={{ width: "70px" }}
                />
                <button
                    className="btn btn-success btn-pill"
                    disabled={cant < 1 || cant > product.stock}
                    onClick={handleAddToCart}
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
