// PassportImageModal.tsx
import React, { useEffect, useState } from "react";
import "./PassportImageModal.css"; // Create a CSS file for modal styling
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface PassportImageModalProps {
  imagePath: string;
  onClose: () => void;
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const PassportImageModal: React.FC<PassportImageModalProps> = ({
  imagePath,
  onClose,
}) => {
  return (
    <div className="passport-image-modal-overlay">
      <div className="passport-image-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img
          src={`${process.env.REACT_APP_BACKEND_PORT}/${imagePath}`}
          alt="Passport"
          className="passport-image"
        />
      </div>
    </div>
  );
};

export default PassportImageModal;
