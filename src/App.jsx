import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { OrderProvider } from "./context/orderContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";
import ProtectedRoute from "./context/ProtectedRoutes";
import Admin from './pages/Admin';

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Route Example */}

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                {" "}
                <Order />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {" "}
                <Home />{" "}
              </ProtectedRoute>
            }
          />
                    <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {" "}
                <Admin />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
