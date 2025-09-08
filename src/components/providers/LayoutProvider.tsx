// layout provider with header and footer components
import React, { ReactNode } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import StockTicker from "../app/StockTicker";


interface LayoutProviderProps {
    children: ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
    return (
        <>
            <StockTicker />
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default LayoutProvider;
