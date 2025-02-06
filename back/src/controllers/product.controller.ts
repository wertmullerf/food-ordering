import { Request, Response } from "express";
import Producto from "../models/Producto"; // Asegúrate de que la ruta es correcta
import { IProducto } from "../interfaces/IProducto";
import { obtenerRecursoPorId } from "../helpers/dbfunctions";
import { obtenerInfoRedis, saveResult } from "../helpers/redisfunction";
import upload from "../config/multerConfig"; // Importa la configuración de Multer
import { BASE_LOCAL_URL } from "../config";
import { verificarCamposProduct } from "../helpers/validatefunctions";
import { Categorias } from "../enums/Categorias";

export const obtenerProductos = async (req: Request, res: Response) => {
    try {
        const reply = await obtenerInfoRedis(res, "product");
        if (reply) {
            res.json(reply.productos ?? []); // ✅ Devuelve solo el array de productos
            return;
        }
        const productos = await Producto.find().lean();
        await saveResult({ productos }, "product"); // ✅ Guarda en Redis con estructura correcta
        res.json(productos); // ✅ Ahora devuelve directamente el array
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const obtenerProductoId = async (req: Request, res: Response) => {
    await obtenerRecursoPorId(Producto, req.params.id, res, "product");
};

export const editarProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true } // Devuelve el documento actualizado
        );

        if (productoActualizado) {
            res.json({ producto: productoActualizado });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al editar producto" });
    }
};

export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);

        if (productoEliminado) {
            res.json({ message: "Producto eliminado" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto" });
    }
};

export const agregarProducto = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifica si se subió una imagen
        if (!req.file) {
            res.status(400).json({ message: "No se subió ninguna imagen" });
            return;
        }

        // Extrae los datos del cuerpo de la solicitud
        const { nombre, precio, stock, costo, descripcion, categoria } =
            req.body;
        console.log("Valores procesados:", {
            nombre,
            precio,
            stock,
            costo,
            categoria,
        });

        const product = {
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            descripcion,
            costo: parseFloat(costo),
        };
        if (!verificarCamposProduct(product)) {
            res.status(400).json({ error: "Faltan campos requeridos" });
            return;
        }
        // **VALIDACIÓN DE CATEGORÍA**
        if (!Object.values(Categorias).includes(categoria)) {
            res.status(400).json({
                error: `Categoría inválida. Categorías permitidas: ${Object.values(
                    Categorias
                ).join(", ")}`,
            });
            return;
        }

        // Verifica si el producto ya existe
        const productoExistente = await Producto.findOne({ nombre }).lean();
        if (productoExistente) {
            res.status(400).json({ error: "Producto ya registrado" });
            return;
        }

        // Crea un nuevo producto con la URL de la imagen
        const productoNuevo: IProducto = new Producto({
            nombre,
            precio: parseFloat(precio), // Convierte a número
            stock: parseInt(stock, 10), // Convierte a número entero
            costo: parseFloat(costo), // Convierte a número
            categoria,
            descripcion,
            imageUrl: `${BASE_LOCAL_URL}/uploads/${req.file.filename}`, // Guarda la ruta de la imagen
        });

        // Guarda el producto en la base de datos
        await productoNuevo.save();

        // Devuelve una respuesta exitosa
        res.status(201).json({
            message: "Producto creado con éxito",
            producto: productoNuevo,
        });
    } catch (error) {
        console.error(error);

        // Otros errores del servidor
        res.status(500).json({ message: "Error al agregar producto" });
    }
};
