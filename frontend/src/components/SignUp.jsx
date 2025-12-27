import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3800/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, number, password }),
    });

    const data = await res.json();
    alert(data.message);
    navigate("/");
    console.log({ name, email, number, password });
    setName("");
    setEmail("");
    setNumber("");
    setPassword("");
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
