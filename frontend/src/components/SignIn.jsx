import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting signin with:", { email: Email, password });
      const res = await fetch(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Email, password }),
        }
      );

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (data.success) {
        alert(data.message);
        navigate("/");
        localStorage.setItem("userData", JSON.stringify(data.user));
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Sign in failed");
      }
    } catch (error) {
      console.error("Signin error:", error);
      alert("Network error: " + error.message);
    }
  };

  useEffect(() => {
    // Any side effects or subscriptions can be handled here
    let data = localStorage.getItem("userData");
    if (data) {
      console.log("User data found:", JSON.parse(data));
    }
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6  border border-gray-300 rounded-lg shadow-lg flex-col gap-4">
        <form
          action=" "
          className="flex flex-col gap-2"
          onSubmit={handlesubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-r-black outline-1 rounded-sm px-2  h-10"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-r-black outline-1 rounded-sm px-2 h-10 "
          />
          <span className="flex ">
            <button
              type="submit"
              className="mt-4  text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer h-10 w-20 bg-blue-500"
            >
              SignIn
            </button>
            <p className=" mt-2 p-2">if you don't have account please </p>

            <Link to="/signup" className="mt-2 p-2 underline">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default SignIn;
