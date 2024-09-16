import React from "react";
import "./ConfirmationModal.css"; // Import CSS for styling
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-button confirm" onClick={onConfirm}>
            {t("Confirm")}
          </button>
          <button className="modal-button cancel" onClick={onCancel}>
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
