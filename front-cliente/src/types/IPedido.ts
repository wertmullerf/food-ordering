export interface IPedido {
    _id: string;
    usuario_id: string;
    direccion_id: string;
    estatus: string;
    productos: {
        producto_id: string;
        nombre: string;
        cantidad: number;
        precio: number;
        personalizaciones: {
            extras: { id: string; cantidad: number }[];
            removidos: { id: string }[];
        };
    }[];
    total: number;
    pago_id: string;
    createdAt: string;
    updatedAt: string;
}
