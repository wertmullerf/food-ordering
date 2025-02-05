// components/Layout.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import CartFooter from "./CartFooter";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isPedidoPage = location.pathname.startsWith("/pedido/");

    return (
        <>
            <Navbar />
            <div className="main-content" style={{ paddingBottom: "100px" }}>
                {children}
            </div>
            {!isPedidoPage && <CartFooter />}
        </>
    );
};

export default Layout;
