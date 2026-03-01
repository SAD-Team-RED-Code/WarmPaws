import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ServiceDetails from "../pages/ServiceDetails";
import Services from "../pages/Services";
import Products from "../pages/Products";
import Medical from "../pages/Medical";
import Adoption from "../pages/Adoption";
import Rescue from "../pages/Rescue";
import ProductDetails from "../pages/ProductDetails";   // ← এটা import করতে ভুলবা না

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "about-us", element: <AboutUs /> },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "service/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "service", element: <Services /> },
      { path: "products", element: <Products /> },
      { path: "medical", element: <Medical /> },
      { path: "adoption", element: <Adoption /> },
      { path: "rescue", element: <Rescue /> },
      
      // Product Details route — সঠিক relative path
      { path: "product/:id", element: <ProductDetails /> },
    ],
  },
]);