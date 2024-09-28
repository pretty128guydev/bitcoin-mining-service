import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./SendMessage.css"; // Create this CSS file for styling
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

interface SendMessageProps {
  recipientId: string;
  onClose: () => void;
  fullName: string;
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}
const SendMessage: React.FC<SendMessageProps> = ({
  recipientId,
  onClose,
  fullName,
}) => {
  const [content, setContent] = useState("");
  const { t } = useTranslation();

  const handleSend = () => {
    const token = localStorage.getItem("token");
    // Decode the token with the specified type
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);

      // Now TypeScript knows that `decoded` has an `id` property
      const userId = decoded.id;
      const read_status = "unread";
      if (content.trim() === "") {
        toast.error(t("Message content cannot be empty."));
        return;
      }
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/send`, {
          userId,
          recipientId,
          content,
          read_status,
        })
        .then(() => {
          toast.success(`${t("Message sent to")} ${fullName}  ${t("successfully.")}`);
          setContent("");
          onClose(); // Close the modal
        })
        .catch(() => {
          toast.error(t("Failed to send message."));
        });
    } else {
      toast.error(t("No token found."));
    }
  };

  return (
    <div className="send-message-overlay">
      <div className="send-message-modal">
        <h2>{`${t("Send Message to")} ${fullName}`}</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("Enter your message here...")}
        />
        <button className="modal-button confirm" onClick={handleSend}>
          {t("Send")}
        </button>
        <button className="modal-button cancel" onClick={onClose}>
          {t("Close")}
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
