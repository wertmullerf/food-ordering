import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { CartItem } from "../types/IProducto";
import { arePersonalizacionesEqual } from "../utils/cartUtils";

// Función auxiliar que compara el _id y las personalizaciones (en este caso, usando JSON.stringify para mayor robustez)
const isSameCartItem = (a: CartItem, b: CartItem): boolean => {
  // Comparamos el _id
  if (a._id !== b._id) return false;
  // Comparamos las personalizaciones; en caso de que sean undefined se transforman a objeto vacío.
  const persA = a.personalizaciones || { extras: [], removidos: [] };
  const persB = b.personalizaciones || { extras: [], removidos: [] };
  return JSON.stringify(persA) === JSON.stringify(persB);
};

interface CartContextType {
  carrito: CartItem[];
  agregarAlCarrito: (item: CartItem) => void;
  eliminarProducto: (item: CartItem) => void;
  eliminarDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  totalCarrito: number;
  itemsEnCarrito: number;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
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

  const agregarAlCarrito = (item: CartItem) => {
    setCarrito((prev) => {
      const index = prev.findIndex((p) => isSameCartItem(p, item));
      if (index !== -1) {
        // Si ya existe, incrementamos su cantidad según lo recibido en item.cantidad.
        const updated = [...prev];
        updated[index].cantidad += item.cantidad;
        return updated;
      } else {
        // Producto distinto: se agrega al carrito respetando la cantidad enviada.
        return [...prev, item];
      }
    });
  };

  const eliminarProducto = (item: CartItem) => {
    setCarrito((prev) => {
      const index = prev.findIndex((p) => isSameCartItem(p, item));
      if (index === -1) return prev; // Si no se encuentra, no se hace nada.
      const updated = [...prev];
      if (updated[index].cantidad > 1) {
        // Si hay más de uno, decrementamos en 1.
        updated[index].cantidad -= 1;
      } else {
        // Si solo queda 1, se elimina completamente el item.
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const eliminarDelCarrito = useCallback((id: string) => {
    setCarrito((prev) => prev.filter((item) => item._id !== id));
  }, []);

  const actualizarCantidad = (id: string, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(id);
      return;
    }

    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item._id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

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
        eliminarProducto,
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

export default CartProvider;
