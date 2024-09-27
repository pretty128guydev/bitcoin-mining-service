import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationCard from "./NotificationCard";
import "./Notification.css";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { MyContext } from "../../MyContext";

interface NotificationData {
  senderId: number;
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

interface NotificationProps {
  setSelectedMenu: (data: any) => void
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const Notification: React.FC<NotificationProps> = ({ setSelectedMenu }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [messages, setMessages] = useState<NotificationData[]>([]);
  const [activeTab, setActiveTab] = useState("Notification");
  const [userId, setUserId] = useState<string>("");
  const { t } = useTranslation();
  const context = useContext(MyContext); // Access the context safely
  const { myunreadmessage, setMyunreadmessages } = context;

  useEffect(() => {
    if (myunreadmessage > 0) {
      setActiveTab("message")
    }
  },[])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      setUserId(userId);

      if (userId) {
        axios
          .get(`${process.env.REACT_APP_BACKEND_PORT}/api/user/${userId}`)
          .then((response) => {
            setMessages(response.data.messages);
            setMyunreadmessages(response.data.count);
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
    navigate("/", { state: { fromService: true } });
  };

  return (
    <div>
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("Notifications")}</h2>
      <div className="Notification-container">
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
                    title={`${t("From")} ${notif.senderFirstName}${notif.senderLastName
                      }`}
                    date={notif.date}
                    content={notif.content}
                    senderEmail={notif.senderEmail}
                    senderLastName={notif.senderLastName}
                    senderFirstName={notif.senderFirstName}
                    createdAt={notif.createdAt}
                    senderId={notif.senderId}
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
                  title={`${t("From")} ${msg.senderFirstName}${msg.senderLastName
                    }`}
                  date={msg.date}
                  content={msg.content}
                  senderEmail={msg.senderEmail}
                  senderLastName={msg.senderLastName}
                  senderFirstName={msg.senderFirstName}
                  senderId={msg.senderId}
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
    </div>
  );
};

export default Notification;
