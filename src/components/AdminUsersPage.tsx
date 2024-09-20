import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"; // Import the modal component
import SendMessage from "./SendMessage"; // Import SendMessage component
import "./AdminUsersPage.css"; // Import the CSS file
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

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sendMessageVisible, setSendMessageVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_PORT}/api/users`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleCheckAdmin = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (selectedUser) {
      const { id } = selectedUser;

      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/update-role`, {
          userId: id,
          newRole: "admin",
        })
        .then(() => {
          toast.success(t("User role updated to admin."));
          setUsers(users.map((user) =>
            user.id === id ? { ...user, role: "admin" } : user
          ));
        })
        .catch(() => {
          toast.error(t("Failed to update user role."));
        });
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSendMessage = (user: User) => {
    setSelectedUser(user);
    setSendMessageVisible(true);
  };

  const handleCloseSendMessage = () => {
    setSendMessageVisible(false);
  };

  const usersToDisplay = users.filter(
    (user) => user.role.toLowerCase() === "user"
  );

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
                  {t("Make this admin")}
                </button>
                <button
                  className="send-message-button"
                  onClick={() => handleSendMessage(user)}
                >
                  {t("Send Message")}
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
          message={`${t("This user is currently a")} ${selectedUser.role.toLowerCase()}${t(". Do you want to promote them to admin?")}`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {sendMessageVisible && selectedUser && (
        <SendMessage fullName={selectedUser.firstname + selectedUser.lastname} recipientId={selectedUser.id} onClose={handleCloseSendMessage} />
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AdminUsersPage;
