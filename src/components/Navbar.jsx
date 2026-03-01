import { Link } from "react-router-dom"; 
import logo from "../assets/img/logo.png";
import MyContainer from "./MyContainer";
import MyLink from "./MyLink";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user, signoutUserFunc, loading } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSignout = async () => {
    try {
      await signoutUserFunc();
      toast.success("Signed out successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="py-3 shadow-md bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 transition-all duration-300">
      <MyContainer className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="WarmPaws Logo"
            className="w-[55px] rounded-full shadow-sm hover:scale-105 transition-transform duration-300"
          />
          <span className="text-xl font-bold text-orange-600 dark:text-yellow-400 hidden sm:inline">
            WarmPaws
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-8 text-lg font-medium">

            <li>
              <MyLink to="/">Home</MyLink>
            </li>
            {/* ✅ NEW PAGES */}
            <li>
              <MyLink to="/products">Products</MyLink>
            </li>

            <li>
              <MyLink to="/medical">Medical</MyLink>
            </li>

            <li>
              <MyLink to="/adoption">Adoption</MyLink>
            </li>

            <li>
              <MyLink to="/rescue">Rescue</MyLink>
            </li>

            {user && (
              <li>
                <MyLink to="/profile">Profile</MyLink>
              </li>
            )}


            <li>
              <MyLink to="/about-us">About Us</MyLink>
            </li>

            <li>
              <MyLink to="/service">Services</MyLink>
            </li>

            
          </ul>
        </nav>

        <UserMenu
          user={user}
          loading={loading}
          theme={theme}
          setTheme={setTheme}
          handleSignout={handleSignout}
        />
      </MyContainer>
    </header>
  );
};

export default Navbar;