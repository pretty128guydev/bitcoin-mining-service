import React, { useState } from "react";
import "./NotificationCard.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

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

type NotificationProps = {
  title: string;
  date: string;
  content: string;
  senderFirstName: string;
  senderLastName: string;
  senderEmail: string;
  createdAt: string;
  userId: string;
  messageId: number;
  setMessages: (messages: NotificationData[]) => void;
};

const NotificationCard: React.FC<NotificationProps> = ({
  title,
  content,
  createdAt,
  senderFirstName,
  senderLastName,
  senderEmail,
  userId,
  messageId,
  setMessages,
}) => {
  const date = new Date(createdAt).toLocaleString("en-US");

  const handleDelete = () => {
    if (userId) {
      axios
        .post(`http://localhost:5000/api/message-delete/${messageId}`, {
          userId: userId,
        })
        .then((response) => {
          console.log(response.data);
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });
    } else {
      console.log("No token found.");
    }
  };

  return (
    <div className="card-notification">
      <div className="card-notification-header">
        <div className="card-notification-title-section">
          <h3 className="card-notification-title">{title}</h3>
          <button className="trash-button" onClick={handleDelete}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
      <div className="card-notification-content-container">
        <p className="card-notification-content" dangerouslySetInnerHTML={{ __html: content }}></p>
        <p className="card-notification-date">{date}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
