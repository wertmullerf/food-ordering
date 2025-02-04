// routes/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import Navbar from "../components/Navbar";
import CartFooter from "../components/CartFooter";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <div className="main-content" style={{ paddingBottom: "100px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/producto/:id"
                        element={<ProductDetail />}
                        key="detail"
                    />
                    <Route path="/carrito" element={<CartPage />} />
                </Routes>
            </div>
            <CartFooter />
        </Router>
    );
};

export default AppRouter;
