import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
//import Checkout from "../pages/Checkout";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                {/* <Route path="/checkout" element={<Checkout />} /> */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
