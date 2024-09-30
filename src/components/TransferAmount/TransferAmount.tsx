import React from 'react';
import './TransferAmount.css';
import flexible_wallet from "../../assets/flexible_wallet.png"
import electron_wallet from "../../assets/electron_wallet.png"
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TransferAmount: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const { t } = useTranslation();

  return (
    <div>
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("Transfer")}</h2>
      <div className="trans-transfer-container">
        <div className="trans-wallet-section">
          <div className="trans-wallet-item">
            <img
              src={flexible_wallet}
            />
            <div className="trans-wallet-details">
              <span>Flexible wallet</span>
              <span className="trans-balance">Balance: 0</span>
            </div>
          </div>
          <div className="trans-wallet-item">
            <img
              src={electron_wallet}
            />
            <div className="trans-wallet-details">
              <span>Electronic wallet</span>
              <span className="trans-balance">Balance: 0</span>
            </div>
          </div>
        </div>

        <div style={{marginBottom: "20px"}}>TRANSFER AMOUNT</div>
        <div className="trans-transfer-amount">
          <input type="text" placeholder="Please enter the transfer amount" />
          <span className="trans-all-btn">All</span>
        </div>

        <div className="trans-security-password">
          <input type="password" placeholder="Security password" />
          <span className="trans-eye-icon">&#128065;</span> {/* Eye icon for password visibility */}
        </div>

        <button className="trans-confirm-btn">Confirm</button>
      </div>
    </div>
  );
};

export default TransferAmount;
