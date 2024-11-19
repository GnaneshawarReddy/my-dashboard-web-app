import React, { useState } from "react";
import api from "../../api";
import "./index.css"

const UserForm = ({ userToEdit, onSave }) => {
  const [user, setUser] = useState(userToEdit || { name: "", email: "", department: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.id) {
        await api.put(`/users/${user.id}`, user);
      } else {
        await api.post("/users", user);
      }
      onSave();
    } catch (err) {
      alert("Failed to save user.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{user.id ? "Edit User" : "Add User"}</h3>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="input-field"
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Website"
        value={user.department}
        onChange={(e) => setUser({ ...user, department: e.target.value })}
        className="input-field"
      />
      <button type="submit" className="save-button">
        {user.id ? "Update" : "Add"} User
      </button>
    </form>
  );
};

export default UserForm;
