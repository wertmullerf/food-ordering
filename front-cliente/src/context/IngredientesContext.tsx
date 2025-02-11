import React, { createContext, useContext, useEffect, useState } from "react";
import { Ingrediente } from "../types/IProducto";

interface IngredientesContextType {
  ingredientes: Ingrediente[];
  ingredientesExtras: Ingrediente[];
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

export const IngredientesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [ingredientesExtras, setIngredientesExtras] = useState<Ingrediente[]>(
    []
  );

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ingredient");
        const data = await res.json();
        if (Array.isArray(data)) {
          setIngredientes(data);
        }
      } catch (error) {
        console.error("Error al obtener ingredientes:", error);
      }
    };

    const fetchIngredientesExtras = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ingredient/extras");
        const data = await res.json();
        console.log(data);
        if (Array.isArray(data)) {
          setIngredientesExtras(data);
        }
      } catch (error) {
        console.error("Error al obtener ingredientes extras:", error);
      }
    };

    fetchIngredientes();
    fetchIngredientesExtras();
  }, []);

  return (
    <IngredientesContext.Provider value={{ ingredientes, ingredientesExtras }}>
      {children}
    </IngredientesContext.Provider>
  );
};
