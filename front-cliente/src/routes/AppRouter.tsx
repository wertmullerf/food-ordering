// routes/AppRouter.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import Pedido from "../pages/PedidoPage";
import Layout from "../components/Layout";

const AppRouter: React.FC = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/pedido/:id" element={<Pedido />} />
            </Routes>
        </Layout>
    );
};

export default AppRouter;
