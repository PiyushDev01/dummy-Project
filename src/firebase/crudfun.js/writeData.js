import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase"; // Ensure db is properly imported from your Firebase config

const addUserWithId = async (user) => {
  if (!user || !user.uid) {
    console.error("Invalid user data. UID is required.");
    return;
  }

  try {
    // Set user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName || "Anonymous", // Handle if displayName is missing
      email: user.email || "No email provided", // Handle if email is missing
      photoURL: user.photoURL || "", // Optional, empty string if missing
    });

    console.log("User document successfully written!");
  } catch (e) {
    console.error("Error writing document: ", e);
  }
};

const addOrder = async (order, user) => {
  if (!order) {
    console.error("Invalid order data.");
    return;
  }

  try {
    // Add order data to the "orders" collection with an auto-generated ID
    const docRef = await addDoc(collection(db, "orders"), {
      orderBy: order.name || "Anonymous", // Handle if name is missing
      user: user.uid, // Store the user ID to link the order with the user
      userName: user.displayName, // Store the user name to display in the order
      createdAt: new Date(), // Optional, add a timestamp for
      ...order, // Spread the rest of the order data
      status: "pending 🔃", // Optional, set a default status
    });

    console.log("Order document successfully written with ID: ", docRef.id);

    // Optionally, return the generated order ID for further use
    return docRef.id;
  } catch (e) {
    console.error("Error writing document: ", e);
  }
};

const existingorder = async (user) => {
  try {
    // Check if the user has already placed an order
    const ordersQuery = query(
      collection(db, "orders"),
      where("user", "==", user.uid)
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    if (!ordersSnapshot.empty) {
      console.log("User has already placed an order!");
      return true;
    }
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
  return false;
};

const getAllOrders = async () => {
  

  try {
    // Query the "orders" collection for orders by the user's UID
    const ordersQuery = query(
      collection(db, "orders")
    );

    const querySnapshot = await getDocs(ordersQuery);
    const ordersList = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Get the document ID
      ...doc.data(), // Spread the rest of the order data
    }));

    return ordersList; // Return the array of orders

  } catch (error) {
    console.error("Error fetching user orders: ", error);
    return [];
  }
};
const getUserOrders = async (user) => {
  if (!user || !user.uid) {
    console.error("Invalid user data. UID is required.");
    return [];
  }

  try {
    // Query the "orders" collection for orders by the user's UID
    const ordersQuery = query(
      collection(db, "orders"),
      where("user", "==", user.uid)
    );

    const querySnapshot = await getDocs(ordersQuery);
    const ordersList = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Get the document ID
      ...doc.data(), // Spread the rest of the order data
    }));

    return ordersList; // Return the array of orders
  } catch (error) {
    console.error("Error fetching user orders: ", error);
    return [];
  }
};

const changeStatus = async (status, orderid) => {
  try {
    await setDoc(doc(db, "orders", orderid), {
      status: status,
    }, { merge: true });
    console.log("Document successfully updated!");
    
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export { addOrder, addUserWithId, existingorder, getUserOrders, getAllOrders, changeStatus };
