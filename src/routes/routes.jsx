import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ServiceDetails from "../pages/ServiceDetails";
import Services from "../pages/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/about-us", element: <AboutUs /> },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/service/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
      {path: "/service", element: <Services />}
    ],
  },
]);
