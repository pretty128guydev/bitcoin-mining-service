import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"; // Import the modal component
import "./AdminsPage.css"; // Import the CSS file
import toast, { Toaster } from "react-hot-toast";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const AdminsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, [users]);

  const handleCheckAdmin = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedUser) {
      const { id, role } = selectedUser;

      // Only attempt to change role if the current role is 'user'
      axios
        .post("http://localhost:5000/api/update-role", {
          userId: id,
          newRole: "superadmin",
        })
        .then((response) => {
          // On success, update the user list
          toast.success("User role updated to superadmin.");
          setUsers(
            users.map((user) =>
              user.id === id ? { ...user, role: "admin" } : user
            )
          );
        })
        .catch((error) => {
          toast.error("Failed to update user role.");
        });
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  // Filter users to include only those with the role 'user'
  const usersToDisplay = users.filter(
    (user) => user.role.toLowerCase() === "admin"
  );

  return (
    <div className="admin-user-container">
      <h1>Users List</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="user-list">
          {usersToDisplay.length > 0 ? (
            usersToDisplay.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-detail">
                  <strong>Name:</strong> {`${user.firstname} ${user.lastname}`}
                </div>
                <div className="user-detail">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="user-detail">
                  <strong>Phone Number:</strong> {user.phoneNumber}
                </div>
                <div className="user-detail">
                  <strong>Role:</strong> {user.role}
                </div>
                <button
                  className="check-admin-button"
                  onClick={() => handleCheckAdmin(user)}
                >
                  Make this superadmin
                </button>
              </div>
            ))
          ) : (
            <p>No users with the role 'user' found.</p>
          )}
        </div>
      )}

      {modalVisible && selectedUser && (
        <ConfirmationModal
          message={`This user is currently a ${selectedUser.role.toLowerCase()}. Do you want to promote them to superadmin?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdminsPage;
