import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { Ingrediente } from "../types/IProducto";
import { getIngredientes, getExtras } from "../services/ingredientService";

interface IngredientesContextType {
    ingredientes: Ingrediente[];
    extras: Ingrediente[];
    cargando: boolean;
}

const IngredientesContext = createContext<IngredientesContextType | undefined>(
    undefined
);

export const useIngredientes = () => {
    const context = useContext(IngredientesContext);
    if (!context) {
        throw new Error(
            "useIngredientes debe usarse dentro de IngredientesProvider"
        );
    }
    return context;
};

export const IngredientesProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [extras, setExtras] = useState<Ingrediente[]>([]);
    const [cargando, setCargando] = useState(true);
    const fetchIngredientes = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/ingredient"
            );
            if (!response.ok)
                throw new Error("Error en la API de ingredientes");

            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error(
                    "La API no devolvió un array de ingredientes:",
                    data
                );
                setIngredientes([]); // ✅ Si no es un array, usar []
                return;
            }

            setIngredientes(data);
        } catch (error) {
            console.error("Error al cargar ingredientes:", error);
            setIngredientes([]); // ✅ Si hay error, usar []
        }
    };
    useEffect(() => {
        fetchIngredientes();
    }, []);

    return (
        <IngredientesContext.Provider
            value={{ ingredientes, extras, cargando }}
        >
            {children}
        </IngredientesContext.Provider>
    );
};
