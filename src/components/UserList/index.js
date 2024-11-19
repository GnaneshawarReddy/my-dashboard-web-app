import React, { useEffect, useState } from "react";
import api from "../../api";
import "./index.css";

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.");
    }
  };

  const handleEditButton = (user) => {
    setEditingUser(user.id);
    setName(user.name);
    setEmail(user.email);
    setWebsite(user.website);
  };

  const handleSaveChanges = async (id) => {
    try {
      const updatedUser = { name, email, website };
      await api.put(`/users/${id}`, updatedUser); // Assuming you're using a PUT request to update the user
      setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
      setEditingUser(null);
    } catch (err) {
      setError("Failed to save changes.");
    }
  };

  const deleteButton = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>User List</h3>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>
              <strong>{user.name}</strong> - {user.email}
            </span>
            <span>
              <strong> - {user.website}</strong>
            </span>
            <div>
              <button onClick={() => handleEditButton(user)} className="edit-button">
                Edit
              </button>

              <button
                onClick={() => deleteButton(user.id)}
                className="delete-button"
              >
                Delete
              </button>

              {editingUser === user.id && (
                <div>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => handleSaveChanges(user.id)}
                    className="save-button"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
