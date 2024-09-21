import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"; // Import the modal component
import SendMessage from "./SendMessage"; // Import SendMessage component
import "./AdminUsersPage.css"; // Import the CSS file
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CuteLoading from "./CuteLoading/CuteLoading";
import ImageViewer from "react-simple-image-viewer";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: string;
  balance: number;
  passport_number: number;
  passport_image_path: string;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sendMessageVisible, setSendMessageVisible] = useState<boolean>(false);
  const [passportModalVisible, setPassportModalVisible] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_PORT}/api/users`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
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
          setUsers(
            users.map((user) =>
              user.id === id ? { ...user, role: "admin" } : user
            )
          );
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

  const handleViewPassport = (user: User) => {
    setSelectedUser(user);
    setPassportModalVisible(true);
  };

  const handleClosePassportModal = () => {
    setPassportModalVisible(false);
  };

  const usersToDisplay = users.filter(
    (user) => user.role.toLowerCase() === "user"
  );

  return (
    <div className="admin-user-container">
      <h1>{t("Users List")}</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="user-list">
          {usersToDisplay.length > 0 ? (
            usersToDisplay.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-detail">
                  <strong>{t("Name:")}</strong>{" "}
                  {`${user.firstname} ${user.lastname}`}
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
                <div className="user-detail">
                  <strong>{t("Balance:")}</strong> ${user.balance}
                </div>
                <div className="user-detail">
                  <strong>{t("Passport Number:")}</strong>{" "}
                  {user.passport_number}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    className="send-message-button"
                    onClick={() => handleViewPassport(user)}
                  >
                    {t("View Passport")}
                  </button>
                  <button
                    className="send-message-button"
                    onClick={() => handleSendMessage(user)}
                  >
                    {t("Send Message")}
                  </button>
                  <button
                    className="send-message-button"
                    onClick={() => handleCheckAdmin(user)}
                  >
                    {t("Make this admin")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>{t("No users found.")}</p>
          )}
        </div>
      )}
      {modalVisible && selectedUser && (
        <ConfirmationModal
          message={`${t(
            "This user is currently a"
          )} ${selectedUser.role.toLowerCase()}${t(
            ". Do you want to promote them to admin?"
          )}`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {sendMessageVisible && selectedUser && (
        <SendMessage
          fullName={selectedUser.firstname + selectedUser.lastname}
          recipientId={selectedUser.id}
          onClose={handleCloseSendMessage}
        />
      )}
      {passportModalVisible && selectedUser && (
        <ImageViewer
          src={[
            `${process.env.REACT_APP_BACKEND_PORT}/${selectedUser.passport_image_path}`,
          ]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={handleClosePassportModal}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
      {loading && <CuteLoading />} {/* Show loading spinner when processing */}
    </div>
  );
};

export default AdminUsersPage;
