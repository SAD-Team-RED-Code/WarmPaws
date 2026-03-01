import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";

const UserMenu = ({ user, loading, handleSignout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="flex items-center gap-4 relative">
      {loading ? (
        <ClockLoader color="#F97316" size={25} />
      ) : user ? (
        <div
          className="relative group"
          ref={dropdownRef}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="focus:outline-none">
            <img
              src={user?.photoURL || "https://via.placeholder.com/88"}
              alt="User"
              className="h-[40px] w-[40px] rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-50">
              <h2 className="text-lg font-semibold text-orange-600 dark:text-yellow-300">
                {user?.displayName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {user?.email}
              </p>
              <button
                onClick={handleSignout}
                className="mt-3 w-full bg-orange-500 hover:bg-orange-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition-all"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/signin"
          className="bg-white dark:bg-orange-500 dark:hover:bg-orange-600 text-orange-600 dark:text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserMenu;