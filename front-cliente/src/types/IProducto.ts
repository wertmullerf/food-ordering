// types/product.ts
export interface CartItem {
    _id: string;
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
    descripcion: string;
    costo?: number;
    imageUrl: string;
    cantidad: number; // 📌 Asegurarnos de que `cantidad` esté aquí
    personalizaciones?: {
        extras: { id: string; cantidad: number }[];
        removidos: string[];
    };
}

export interface Product {
    _id: string;
    nombre: string;
    precio: number;
    costo: number;
    stock: number;
    imageUrl: string;
    descripcion: string;
    categoria: string;
}
