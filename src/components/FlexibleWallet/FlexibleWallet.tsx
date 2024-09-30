import React, { useState } from 'react';
import './FlexibleWallet.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import nonews from "../../assets/nonews.svg";
import TransactionItem from '../TransactionItem/TransactionItem';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import CuteLoading from '../CuteLoading/CuteLoading';


interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const FlexibleWallet: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  const transactions = [
    {
      title: 'Withdrawal deduction',
      amount: '-1.03',
      isNegative: true,
      date: '2024/09/16 11:53:23',
    },
    {
      title: 'Task earnings',
      amount: '0.50',
      isNegative: false,
      date: '2024/09/16 11:52:59',
    },
  ];

  const { t } = useTranslation();
  
  const Recharge = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };


  const handleConfirm = (amount: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;

      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/create_payment`, {
          amount: amount,
          sender_id: userId,
          price_currency: "usdttrc20",
        })
        .then((response) => {
          setLoading(false);
          const paymentId = response?.data?.invoice_id;
          window.location.href = `https://nowpayments.io/payment?iid=${paymentId}`;
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    } else {
      console.log(`No token found.`);
    }
  };

  return (
    <div className='flexible_wallet'>
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("Flxible Wallet")}</h2>
      <div className="flexible-wallet-container">
        <div className="flexible-wallet-header">
          <div className="flexible-wallet-balance">
            <h3>Total Assets(USDT)</h3>
            <h1>0.00</h1>
          </div>
        </div>

        <div className="flexible-wallet-actions">
          <button className="flexible-wallet-action" onClick={() => Recharge()}>Recharge</button>
          <button className="flexible-wallet-action" onClick={() => navigate("/menu/rechargeSelect")}>Withdraw</button>
          <button className="flexible-wallet-action"  onClick={() => navigate("/transfer")}>Transfer</button>
        </div>

      </div>
      <div className="flexible-wallet-asset-details">
        <h4>Asset Details</h4>
        <div className="flexible-wallet-asset-placeholder">
          <img src={nonews} style={{ width: "100px" }} />
          <p>No data yet</p>
        </div>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            title={transaction.title}
            amount={transaction.amount}
            isNegative={transaction.isNegative}
            date={transaction.date}
          />
        ))}
      </div>
      {modalVisible && (
        <div>
          <ConfirmationModal
            message={""}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            recharge={true}
          />
        </div>
      )}
      {loading && <CuteLoading />}
    </div>
  );
};

export default FlexibleWallet;
