import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal"; // Import the modal component
import SendMessage from "./SendMessage"; // Import SendMessage component
import "./AdminsPage.css"; // Import the CSS file
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CuteLoading from "./CuteLoading/CuteLoading";
import ImageViewer from "react-simple-image-viewer";
import { TbMessage2Plus } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { RiImageCircleLine } from "react-icons/ri";
import { RiAlarmWarningFill } from "react-icons/ri";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: string;
  balance: number;
  passport_number: string;
  passport_image_path: string;
  button_clicks: string;
  package_remain: number;
  withdraw_status: string;
  withdraw_amount: number;
  all_withdraw: number;
}

const AdminsPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pendingModalVisible, setPendingModalVisible] = useState<boolean>(false);
  const [sendMessageVisible, setSendMessageVisible] = useState<boolean>(false);
  const [passportModalVisible, setPassportModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_PORT}/api/users`)
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    setFilteredUsers(users.filter(user => {
      // Helper function to safely convert values to lowercased strings
      const toLowerCaseString = (value: any) => {
        return typeof value === 'string' ? value.toLowerCase() : String(value).toLowerCase();
      };

      // Check if any of the fields contains the search query
      return [
        user.firstname,
        user.lastname,
        user.email,
        user.phoneNumber,
        user.passport_number,
        user.withdraw_status,
        user.role
      ].some(field => toLowerCaseString(field).includes(lowercasedQuery)) ||
        [
          user.balance,
          user.button_clicks,
          user.package_remain,
          user.withdraw_amount,
          user.all_withdraw
        ].some(field => toLowerCaseString(field).includes(lowercasedQuery));
    }));
  }, [searchQuery, users]);


  const handleCheckAdmin = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handlePending = (user: User) => {
    setSelectedUser(user);
    setPendingModalVisible(true);
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
          setUsers(users.map(user =>
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
    setPendingModalVisible(false);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const highlightText = (text: any, query: string) => {
    const textString = typeof text === 'number' ? text.toString() : (text || '');

    if (!textString || !query.trim()) return textString;

    const regex = new RegExp(`(${query})`, 'gi');
    return textString.replace(regex, '<mark>$1</mark>');
  };

  const pendingCancle = () => {
    if (selectedUser) {
      setLoading(true);
      const { id, withdraw_amount } = selectedUser;

      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/update-pending`, {
          userId: id,
          newstatus: "completed",
          withdrawamount: withdraw_amount
        })
        .then((response) => {
          setLoading(false);
          toast.success(t("Transaction is completed successfully"));
          setUsers(response.data);
          setFilteredUsers(response.data);
        })
        .catch(() => {
          setLoading(false);
          toast.error(t("Failed to update user role."));
        });
    }
    setPendingModalVisible(false);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const usersToDisplay = filteredUsers
    .filter((user) => ["admin", "user"].includes(user.role.toLowerCase()))
    .sort((a, b) => {
      // Sort admins first, then users
      if (a.role.toLowerCase() === "admin" && b.role.toLowerCase() !== "admin") {
        return -1; // Admins come first
      } else if (a.role.toLowerCase() !== "admin" && b.role.toLowerCase() === "admin") {
        return 1; // Users come after admins
      }
      return 0; // Keep the original order within the same role
    })
    .slice(startIndex, endIndex);




  return (
    <div className="app-container">
      <div className="search-header">
        <input
          type="text"
          placeholder={t("Search")}
          className="search-bar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* <button className="add-user-btn">{t("Add User")} +</button> */}
      </div>

      <table className="user-table">
        <thead style={{ overflow: "auto", color: "#fff" }}>
          <tr>
            <th>No</th>
            <th>{t("Name")}</th>
            <th>{t("Email")}</th>
            <th>{t("Phone Number")}</th>
            <th>{t("Role")}</th>
            <th>{t("Balance")}</th>
            <th>{t("Withdraw Money")}</th>
            <th>{t("Remain Package Days")}</th>
            <th>{t("Clicks")}</th>
            <th>{t("Passport Number")}</th>
            <th>{t("Action")}</th>
          </tr>
        </thead>
        <tbody style={{ overflow: "auto", color: "#fff" }}>
          {usersToDisplay.length > 0 ? (
            usersToDisplay.map((user, index) => (
              <tr key={user.id}>
                <td>{startIndex + index + 1}</td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(`${user.firstname} ${user.lastname}`, searchQuery) }}></td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.email, searchQuery) }}></td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.phoneNumber || '', searchQuery) }}></td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.role || '', searchQuery) }}></td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.balance, searchQuery) }}></td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.all_withdraw, searchQuery) }}></td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.package_remain, searchQuery) }}></td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.button_clicks, searchQuery) }}></td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.passport_number, searchQuery) }}></td>
                <td>
                  <TbMessage2Plus className="edit-btn" onClick={() => handleSendMessage(user)} />
                  <RiImageCircleLine className="delete-btn" onClick={() => handleViewPassport(user)} />
                  {user.role === "user" && <RiAdminLine className="delete-btn" onClick={() => handleCheckAdmin(user)} />}
                  {user.withdraw_status === "pending" && <RiAlarmWarningFill className="pending-btn" onClick={() => handlePending(user)} />}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11}>{t("No users found.")}</td>
            </tr>
          )}
        </tbody>

      </table>

      <div className="pagination">
        {/* <span>{t("Items per page:")}</span>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {ITEMS_PER_PAGE_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select> */}
        <span>{t("Page")} {currentPage} {t("of")} {totalPages}</span>
        <button
          className="page-btn"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀
        </button>
        <button
          className="page-btn"
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>
      </div>
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
      {pendingModalVisible && selectedUser && (
        <ConfirmationModal
          message={`Did you send $${selectedUser.withdraw_amount}?
          If so, click the confirm button.
          The pending status will be completed and the transaction will be completed.`}
          onConfirm={pendingCancle}
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
      {loading && <CuteLoading />}
    </div>
  );
};

export default AdminsPage;
