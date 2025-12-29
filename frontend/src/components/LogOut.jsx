import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/logout`);
      localStorage.removeItem("userData");
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer bg-red-500"
    >
      Logout
    </button>
  );
};

export default LogOut;
