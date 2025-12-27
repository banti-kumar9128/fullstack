import React, { useState } from "react";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !address.trim()) return;

    const newTodo = {
      firstName,
      lastName,
      address,
      image: image ? URL.createObjectURL(image) : imagePreview,
    };

    if (editIndex !== null) {
      const updatedTodos = [...todoList];
      updatedTodos[editIndex] = newTodo;
      setTodoList(updatedTodos);
      setEditIndex(null);
    } else {
      setTodoList([...todoList, newTodo]);
    }

    // reset
    setFirstName("");
    setLastName("");
    setAddress("");
    setImage(null);
    setImagePreview(null);
  };

  const handleDelete = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const item = todoList[index];
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setAddress(item.address);
    setImagePreview(item.image);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Todo List App
      </h1>

      {/* IMAGE PREVIEW */}
      {imagePreview && (
        <img
          src={imagePreview}
          alt="preview"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3"
        />
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border px-3 h-10 rounded w-full"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border px-3 h-10 rounded w-full"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border px-3 h-10 rounded w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border h-10 rounded w-full sm:w-52"
        />

        <button
          type="submit"
          className={`h-10 px-6 rounded font-semibold text-white w-full sm:w-auto ${
            editIndex !== null ? "bg-green-500" : "bg-amber-500"
          }`}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* LIST */}
      <ul className="mt-6 w-full max-w-3xl">
        {todoList.map((item, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 border p-3 mb-3 rounded bg-white shadow"
          >
            <div className="flex items-center gap-3">
              {item.image && (
                <img
                  src={item.image}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold text-lg">
                  {item.firstName} {item.lastName}
                </span>
                <span className="text-sm text-gray-600">
                  {item.address}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 px-4 py-1 rounded text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 px-4 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
