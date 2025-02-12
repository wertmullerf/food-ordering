import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./routes/AppRouter";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { IngredientesProvider } from "./context/IngredientesContext";
const App: React.FC = () => {
  return (
    <IngredientesProvider>
      <CartProvider>
        <Router>
          <AppRouter />
        </Router>
      </CartProvider>
    </IngredientesProvider>
  );
};

export default App;
