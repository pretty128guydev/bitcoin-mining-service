import React, { useState } from "react";
import "./Notification.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type NotificationProps = {
  title: string;
  date: string;
};

const NotificationCard: React.FC<NotificationProps> = ({ title, date }) => {
  return (
    <div className="Notification-card">
      <h3 className="Notification-title">{title}</h3>
      <p className="Notification-date">{date}</p>
    </div>
  );
};

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  const [activeTab, setActiveTab] = useState("Notification");

  return (
    <div className="Notification-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>Notification</h2>
      <div className="tab-menu">
        <button
          className={activeTab === "Notification" ? "active" : ""}
          onClick={() => setActiveTab("Notification")}
        >
          Announcement
        </button>
        <button
          className={activeTab === "message" ? "active" : ""}
          onClick={() => setActiveTab("message")}
        >
          Message
        </button>
      </div>

      {activeTab === "Notification" ? (
        <NotificationCard
          title="Kwtvok Notification"
          date="1970/01/01 03:00:00"
        />
      ) : (
        <div className="no-content">No Messages</div>
      )}
    </div>
  );
};

export default Notification;
