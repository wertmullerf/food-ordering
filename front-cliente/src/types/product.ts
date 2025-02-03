export interface Product {
    _id: string;
    nombre: string;
    precio: number;
    costo: number;
    stock: number;
    imageUrl: string;
    cantidad?: number;
}
