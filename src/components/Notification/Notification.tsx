import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationCard from "./NotificationCard";
import "./Notification.css";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

interface NotificationData {
  title: string;
  date: string;
  content: string;
  senderEmail: string;
  senderFirstName: string;
  senderLastName: string;
  createdAt: string;
  userId: string;
  messageId: number;
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const Notification: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [messages, setMessages] = useState<NotificationData[]>([]);
  const [activeTab, setActiveTab] = useState("Notification");
  const [userId, setUserId] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      setUserId(userId);

      if (userId) {
        axios
          .get(`http://localhost:5000/api/user/${userId}`)
          .then((response) => {
            console.log(response.data);
            setMessages(response.data);
          })
          .catch((error) => {
            console.error("Error fetching messages", error);
          });
      }
    } else {
      console.log("No token found.");
    }
  }, [userId, activeTab]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="Notification-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("Notifications")}</h2>
      <div className="notifi-container">
        <div className="tab-menu">
          <button
            className={activeTab === "Notification" ? "active" : ""}
            onClick={() => setActiveTab("Notification")}
          >
            {t("Announcement")}
          </button>
          <button
            className={activeTab === "message" ? "active" : ""}
            onClick={() => setActiveTab("message")}
          >
            {t("Message")}
          </button>
        </div>

        <div className="notification-content">
          {activeTab === "Notification" ? (
            notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <NotificationCard
                  key={index}
                  title={`${t("From")} ${notif.senderFirstName}${notif.senderLastName}`}
                  date={notif.date}
                  content={notif.content}
                  senderEmail={notif.senderEmail}
                  senderLastName={notif.senderLastName}
                  senderFirstName={notif.senderFirstName}
                  createdAt={notif.createdAt}
                  userId={userId}
                  messageId={notif.messageId}
                  setMessages={setMessages}
                />
              ))
            ) : (
              <div className="no-content">{t("No Notifications")}</div>
            )
          ) : messages.length > 0 ? (
            messages.map((msg, index) => (
              <NotificationCard
                key={index}
                title={`${t("From")} ${msg.senderFirstName}${msg.senderLastName}`}
                date={msg.date}
                content={msg.content}
                senderEmail={msg.senderEmail}
                senderLastName={msg.senderLastName}
                senderFirstName={msg.senderFirstName}
                createdAt={msg.createdAt}
                userId={userId}
                messageId={msg.messageId}
                setMessages={setMessages}
              />
            ))
          ) : (
            <div className="no-content">{t("No Messages")}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
