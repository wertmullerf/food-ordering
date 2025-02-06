import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface Ingrediente {
    _id: string;
    nombre: string;
    precioExtra?: number;
    removible: boolean;
}

interface IngredientesContextType {
    ingredientes: Ingrediente[];
    extras: Ingrediente[];
    cargando: boolean;
    recargarIngredientes: () => void;
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
        setCargando(true);
        try {
            const resIngredientes = await fetch(
                "http://localhost:3000/api/ingredient"
            );
            const resExtras = await fetch(
                "http://localhost:3000/api/ingredient/extras"
            );
            // Validar si las respuestas son JSON antes de parsearlas
            const isJson = (res: Response) =>
                res.headers.get("content-type")?.includes("application/json");

            if (!resIngredientes.ok || !resExtras.ok) {
                throw new Error(
                    `Error en la API: ${resIngredientes.status} - ${resExtras.status}`
                );
            }

            if (!isJson(resIngredientes) || !isJson(resExtras)) {
                throw new Error("La API no devolvió JSON válido");
            }

            const dataIngredientes = await resIngredientes.json();
            const dataExtras = await resExtras.json();

            setIngredientes(dataIngredientes);
            setExtras(dataExtras);
        } catch (error) {
            console.error("Error al cargar ingredientes:", error);
        }
        setCargando(false);
    };

    useEffect(() => {
        fetchIngredientes();
    }, []);

    return (
        <IngredientesContext.Provider
            value={{
                ingredientes,
                extras,
                cargando,
                recargarIngredientes: fetchIngredientes,
            }}
        >
            {children}
        </IngredientesContext.Provider>
    );
};
