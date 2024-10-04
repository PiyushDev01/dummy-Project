import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../context/orderContext";
import { MyContext } from "../context/UserContex";
import { addOrder, existingorder ,getUserOrders} from "../firebase/crudfun.js/writeData";

const Order = () => {
  const { OrderDetails, setOrderdetail } = useContext(OrderContext);
  const { user } = useContext(MyContext);
  const [orderlist, setOrderlist] = useState([]);

  const [clicked, setClicked] = useState(null);
  const [orderExists, setOrderExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [orderStatus, setOrderStatus] = useState("");
  const orders = ["single", "double", "mutiple"];
  const navigate = useNavigate();

  // Check if the user has already placed an order
  useEffect(() => {
    const fetchOrderData = async () => {
      if (user) {
        const orderFound = await existingorder(user);
        setOrderExists(orderFound);
        
      }
       setOrderlist(await getUserOrders(user));
      setIsLoading(false);
    };

    fetchOrderData();
  }, [user]);

  const handleOrderPlace = async () => {
    if (!orderExists) {
      await addOrder(OrderDetails, user);
      navigate("/"); // Optionally, navigate to another page after placing the order
    }
  };

  const handleOrder = (index, order) => {
    setOrderdetail((prevDetails) => ({
      ...prevDetails,
      order,
    }));
    setClicked(index);
  };

  // Function to render content based on the state
  const renderContent = () => {
    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    if (orderExists) {
      return (
        <div className="my-6">
          <h1>Order already placed</h1>
          <h2>Status: {orderlist[0].status || "No status available"}</h2>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        <h1>Orders</h1>
        <input
          className="py-2 px-4 rounded-lg"
          value={OrderDetails.name}
          onChange={(e) =>
            setOrderdetail((prevDetails) => ({
              ...prevDetails,
              name: e.target.value,
            }))
          }
          type="text"
          placeholder="Name"
        />
        <input
          className="py-2 px-4 rounded-lg"
          value={OrderDetails.address}
          onChange={(e) =>
            setOrderdetail((prevDetails) => ({
              ...prevDetails,
              address: e.target.value,
            }))
          }
          type="text"
          placeholder="Address"
        />
        <input
          className="py-2 px-4 rounded-lg"
          value={OrderDetails.phone}
          onChange={(e) =>
            setOrderdetail((prevDetails) => ({
              ...prevDetails,
              phone: e.target.value,
            }))
          }
          type="number"
          placeholder="Phone"
        />

        <div className="orderopt flex gap-2">
          {orders.map((order, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-lg ${
                clicked === index || OrderDetails.order === order
                  ? "border-sky-500"
                  : "border-black-500"
              } `}
              onClick={() => handleOrder(index, order)}
            >
              {order}
            </button>
          ))}
        </div>

        <button
          className="py-2 px-4 bg-sky-500 text-white rounded-lg"
          type="submit"
          onClick={handleOrderPlace}
        >
          Place Order
        </button>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
    </>
  );
};

export default Order;
