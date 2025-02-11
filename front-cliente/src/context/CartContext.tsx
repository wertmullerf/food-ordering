import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import { CartItem } from "../types/IProducto";

interface CartContextType {
    carrito: CartItem[];
    agregarAlCarrito: (item: CartItem) => void; // Antes: Omit<CartItem, "cantidad">
    eliminarDelCarrito: (id: string) => void;
    actualizarCantidad: (id: string, cantidad: number) => void;
    totalCarrito: number;
    itemsEnCarrito: number;
}

interface CartProviderProps {
    children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [carrito, setCarrito] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = useCallback((item: Omit<CartItem, "cantidad">) => {
        setCarrito((prev) => {
            return [...prev, { ...item, cantidad: 1 }];
        });
    }, []);

    const eliminarDelCarrito = useCallback((id: string) => {
        setCarrito((prev) => prev.filter((item) => item._id !== id));
    }, []);

    const actualizarCantidad = useCallback((id: string, cantidad: number) => {
        if (cantidad < 1) return;
        setCarrito((prev) =>
            prev.map((item) => (item._id === id ? { ...item, cantidad } : item))
        );
    }, []);

    const totalCarrito = carrito.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
    );

    const itemsEnCarrito = carrito.reduce(
        (total, item) => total + item.cantidad,
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
                itemsEnCarrito,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
