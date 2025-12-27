import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("userData")
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link to="/">Home</Link>

      <div className="flex gap-4">
        {!isLoggedIn ? (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
