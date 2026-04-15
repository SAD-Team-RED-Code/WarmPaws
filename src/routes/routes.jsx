import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";

import PrivateRoute from "../privateRoute/PrivateRoute";

import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";

import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";

import Medical from "../pages/Medical";
import Adoption from "../pages/Adoption";
import Rescue from "../pages/Rescue";

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

      { path: "services", element: <Services /> },
      { path: "service/:id", element: <ServiceDetails /> },

      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails /> },

      { path: "medical", element: <Medical /> },
      { path: "adoption", element: <Adoption /> },
      { path: "rescue", element: <Rescue /> },

      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
    ],
  },
]);