import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom"; // ✅ FIXED
import { router } from "./routes/routes.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider.jsx";
import { CartProvider } from "./context/CartProvider";

createRoot(document.getElementById("root")).render(
 <AuthProvider>
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
  <ToastContainer />
</AuthProvider>
);