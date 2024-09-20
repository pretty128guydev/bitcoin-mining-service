import React, { useState } from "react";
import "./ConfirmationModal.css"; // Import CSS for styling
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  message: string;
  onConfirm: (amount: number) => void; // Update to accept the number as an argument
  onCancel: () => void;
  recharge?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
  recharge,
}) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number>(0); // State for the number selector

  const handleConfirm = () => {
    onConfirm(amount); // Pass the amount to onConfirm
  };

  const remessage = `Do you want to recharge $${amount} to your wallet now?`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {recharge && (
          <div>
            <h4 style={{ display: "flex", color: "#fff" }}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIQSURBVHgBxZfNTttAEMfHeQA7t6qS05pDP9RecqBV00u5oZ7aN6grXiAPANh3EOSMQIIbcOINCAc4IxEkOMXE3CF+gWFm2YBjCfCME/GTJuuNvTt/z+7YYwcEIOIcNb/ImtaC3OnE2hHZgeM4pzBJyHlIdogy+jwOqsJ3bierQt9GUCUgwskSSQWs43RYLysgwukSvSQglMw2HA7x+OTEtELaTwkIyG7KzjIYDPDDpy/45q2Ps99b2Ov1UAD7CUa+azkdMVkdSrIcxZBlmTlO0xQ2NrdAAPuJxkRYVf+gAtkwkw7hpa8/iCDaIMR1vbF+o+GDgnZexB8QUnTqui4oMNGv2aUIQEjD9wuiGqCAkyHgSDRBget5z4oS0GQRASh4V1gOz1MtB2MiUTot8xT3gHI5mHoNlBSdKjemgUXcgpLRPlCm54hbFpGAkp+tlml/z89DBRLHpmgflKTpddVIzJhfEpKggpXVNQz/L+Du3j4qebx56sQoZHEpNm/QkXFfQYf9O1YEp+kNCPj4+evDW5TxKDsuL85ByAxV5YlJUTrgDNmRjC7uA1/+nNhmAWP/oLCoOTvr4ey3H2YpuLjhvoCxoqYopC2ZyZR3x6ryLoTnQMUmFRJDGejCDk6HDkjAyUckBg00sImv+RlYEBOiXEwXS34QOyCAI0PNX7I5uC+G3udOX5GdWuvSM6ALJbkD+2kAQ2g/9GwAAAAASUVORK5CYII="
                alt="Reminder Icon"
                className="reminder-icon"
              />
              All transactions are conducted in USD.
            </h4>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <label
                htmlFor="amount"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  marginRight: "10px",
                  fontSize: "15px",
                }}
              >
                Recharge:
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={{
                  height: "35px",
                  borderRadius: "5px",
                  fontSize: "15px",
                }} // Set minimum value if needed
              />
            </div>
          </div>
        )}
        {recharge ? (
          <h3 style={{ color: "#fff" }}>{remessage}</h3>
        ) : (
          <h3 style={{ color: "#fff" }}>{message}</h3>
        )}
        <div className="modal-buttons">
          <button className="modal-button confirm" onClick={handleConfirm}>
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
