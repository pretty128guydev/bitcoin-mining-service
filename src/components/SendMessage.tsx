import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./SendMessage.css"; // Create this CSS file for styling
import { jwtDecode } from "jwt-decode";

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

  const handleSend = () => {
    const token = localStorage.getItem("token");
    // Decode the token with the specified type
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);

      // Now TypeScript knows that `decoded` has an `id` property
      const userId = decoded.id;
      const read_status = "unread";
      if (content.trim() === "") {
        toast.error("Message content cannot be empty.");
        return;
      }
      axios
        .post("http://localhost:5000/api/send", {
          userId,
          recipientId,
          content,
          read_status,
        })
        .then(() => {
          toast.success(`Message sent to ${fullName}  successfully.`);
          setContent("");
          onClose(); // Close the modal
        })
        .catch(() => {
          toast.error("Failed to send message.");
        });
    } else {
      toast.error("No token found.");
    }
  };

  return (
    <div className="send-message-modal">
      <h2>{`Send Message to ${fullName}`}</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your message here..."
      />
      <button className="modal-button confirm" onClick={handleSend}>
        Send
      </button>
      <button className="modal-button cancel" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default SendMessage;
