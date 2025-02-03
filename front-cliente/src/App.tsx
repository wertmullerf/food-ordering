import React from "react";
import AppRouter from "./routes/AppRouter";
import "./App.css";
import { CartProvider } from "./context/CartContext";
const App: React.FC = () => {
    return (
        <CartProvider>
            <AppRouter />
        </CartProvider>
    );
};

export default App;
