import React from 'react'
import { useState, useEffect } from 'react';
import { changeStatus, getAllOrders } from '../firebase/crudfun.js/writeData';

function OrdersCard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const data = await getAllOrders();
            setOrders(data);
            console.log("Orders:", data);
            setLoading(false); // Hide loading when data is fetched
          } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
          }
        };
        fetchOrders();
    }, [reload]);
  return (
   <>
   <button onClick={()=>{
    setReload(!reload);
   }}  className=' m-4'> Reload</button>
    <div className="bg-slate-700 rounded-lg min-w-40 w-fit min-h-60 h-fit p-4">
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="bg-zinc-800 m-2 p-2 rounded-lg">
            <h3>{order.userName}</h3>
            <h3>{order.order}</h3>
            <p>{order.status}</p>
            <p>{order.address}</p>
            <div className="buttonSection">
                <button onClick={()=>{
                        changeStatus('rejected', order.id);
                        setOrders((prevOrders) => {
                        const updatedOrders = [...prevOrders];
                        updatedOrders[index].status = 'rejected';
                        return updatedOrders;
                        });
                 }} className=' bg-red-500 m-4 shadow-lg'>REJECT</button> 
                 <button 
                    onClick={()=>{
                        changeStatus('accepted', order.id);
                        setOrders((prevOrders) => {
                        const updatedOrders = [...prevOrders];
                        updatedOrders[index].status = 'accepted';
                        return updatedOrders;
                        });
                    }}
                 className=' bg-green-500  shadow-lg m-4'>ACCEPT</button>
                </div>
          </div>
        ))
      )}
    </div>
   </>
  )
}

export default OrdersCard