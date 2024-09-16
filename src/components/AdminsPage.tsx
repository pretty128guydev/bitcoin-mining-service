import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"; // Import the modal component
import "./AdminsPage.css"; // Import the CSS file
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

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
          toast.success(t("User role updated to superadmin."));
          setUsers(
            users.map((user) =>
              user.id === id ? { ...user, role: "admin" } : user
            )
          );
        })
        .catch((error) => {
          toast.error(t("Failed to update user role."));
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
  const { t } = useTranslation();

  return (
    <div className="admin-user-container">
      <h1>{t("Users List")}</h1>
      {loading ? (
        <p className="loading">{t("Loading...")}</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="user-list">
          {usersToDisplay.length > 0 ? (
            usersToDisplay.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-detail">
                  <strong>{t("Name:")}</strong> {`${user.firstname} ${user.lastname}`}
                </div>
                <div className="user-detail">
                  <strong>{t("Email:")}</strong> {user.email}
                </div>
                <div className="user-detail">
                  <strong>{t("Phone Number:")}</strong> {user.phoneNumber}
                </div>
                <div className="user-detail">
                  <strong>{t("Role:")}</strong> {user.role}
                </div>
                <button
                  className="check-admin-button"
                  onClick={() => handleCheckAdmin(user)}
                >
                  {t("Make this superadmin")}
                </button>
              </div>
            ))
          ) : (
            <p>{t("No users with the role 'user' found.")}</p>
          )}
        </div>
      )}

      {modalVisible && selectedUser && (
        <ConfirmationModal
          message={`${t("This user is currently a")} ${selectedUser.role.toLowerCase()} ${t(". Do you want to promote them to superadmin?")}`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdminsPage;
