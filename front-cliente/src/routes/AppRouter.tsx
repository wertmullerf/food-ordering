// routes/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import Navbar from "../components/Navbar";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
