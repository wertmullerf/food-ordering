import React from "react";
import AppRouter from "./routes/AppRouter";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
const App: React.FC = () => {
    return (
        <CartProvider>
            <Router>
                <AppRouter />
            </Router>
        </CartProvider>
    );
};

export default App;
