// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MyContext } from './UserContex'; // Import the context

const ProtectedRoute = ({ children }) => {
  const { isuser } = useContext(MyContext); // Get user data from the context

  // If the user is not authenticated, redirect to login
  if (!isuser) {
    return <Navigate to="/login" />;
  }

  // Otherwise, allow access to the protected route
  return children;
};

export default ProtectedRoute;
