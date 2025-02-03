// context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
}

interface CartContextType {
    carrito: CartItem[];
    agregarAlCarrito: (item: CartItem) => void;
    eliminarDelCarrito: (id: string) => void;
    actualizarCantidad: (id: string, cantidad: number) => void;
    totalCarrito: number;
}

// Definir el tipo para las propiedades del CartProvider
interface CartProviderProps {
    children: ReactNode; // Esto permite que el componente reciba children
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [carrito, setCarrito] = useState<CartItem[]>([]);

    const agregarAlCarrito = (item: CartItem) => {
        console.log("Entre");
        setCarrito((prevCarrito) => {
            const itemExistente = prevCarrito.find(
                (prod) => prod.id === item.id
            );

            if (itemExistente) {
                return prevCarrito.map((prod) =>
                    prod.id === item.id
                        ? { ...prod, cantidad: prod.cantidad + item.cantidad }
                        : prod
                );
            } else {
                return [...prevCarrito, item];
            }
        });
        console.log(carrito);
    };

    const eliminarDelCarrito = (id: string) => {
        setCarrito((prevCarrito) =>
            prevCarrito.filter((item) => item.id !== id)
        );
    };

    const actualizarCantidad = (id: string, cantidad: number) => {
        setCarrito((prevCarrito) =>
            prevCarrito.map((item) =>
                item.id === id ? { ...item, cantidad } : item
            )
        );
    };

    const totalCarrito = carrito.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
    );

    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                actualizarCantidad,
                totalCarrito,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
