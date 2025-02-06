export interface CartItem extends IProducto {
    cantidad: number;
    personalizaciones?: {
        extras: ExtraSeleccionado[];
        removidos: string[];
    };
    costo?: number;
}
export interface Ingrediente {
    _id: string;
    nombre: string;
    precioExtra?: number;
    removible: boolean;
}

export interface IngredienteConCantidad {
    id: string;
    cantidad: number;
}

export interface ExtraSeleccionado {
    id: string;
    cantidad: number;
}

export interface IProducto {
    _id: string;
    nombre: string;
    precio: number;
    stock: number;
    imageUrl: string;
    descripcion: string;
    categoria: string;
    ingredientes?: IngredienteConCantidad[]; // ✅ Ahora es opcional
}
