import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const handleSave = () => {
    setUserToEdit(null);
  };

  return (
    <div>
      <UserForm userToEdit={userToEdit} onSave={handleSave} />
      <UserList onEdit={handleEdit} />
    </div>
  );
};

export default App;
