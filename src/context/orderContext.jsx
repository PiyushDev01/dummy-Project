import { createContext,useState } from "react";
import React from "react";
const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [OrderDetails, setOrderdetail] = React.useState({});

    return (
        <OrderContext.Provider value={{ OrderDetails, setOrderdetail }}>
            {children}
        </OrderContext.Provider>
        );

}
export { OrderContext, OrderProvider };         
