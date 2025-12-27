import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting signup with:", { name, email, number, password });
      const response = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/register`,
        { name, email, number, password }
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.data.success) {
        alert(response.data.message);
        navigate("/");
        setName("");
        setEmail("");
        setNumber("");
        setPassword("");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        "Network error: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6  border border-gray-300 rounded-lg shadow-lg flex-col gap-4">
        <form
          action=" "
          className="flex flex-col gap-2"
          onSubmit={handlesubmit}
        >
          <label htmlFor="text">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-r-black outline-1 rounded-sm px-2 h-10 "
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-r-black outline-1 rounded-sm px-2  h-10"
          />

          <label htmlFor="str">Number</label>
          <input
            type="str"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
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
              SignUp
            </button>
            <p className=" mt-2 p-2">if you have account please </p>

            <Link to="/signin" className="mt-2 p-2 underline">
              SignIn
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default SignUp;
