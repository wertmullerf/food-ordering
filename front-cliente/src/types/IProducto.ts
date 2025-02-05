// types/product.ts
export interface CartItem extends Product {
  cantidad: number; // Hacemos obligatoria la cantidad en el carrito
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
