import React, { useContext, useEffect, useState } from 'react';
import './TransferAmount.css';
import flexible_wallet from "../../assets/flexible_wallet.png"
import electron_wallet from "../../assets/electron_wallet.png"
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { MyContext } from '../../MyContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import CuteLoading from '../CuteLoading/CuteLoading';


interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}


const TransferAmount: React.FC = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const { mybalance, setMybalance } = context;
  const [flexibleBalance, setFlexibleBalance] = useState<number>(0);
  const [transferamount, settransferamount] = useState<number>(0);
  const [securitypassword, setsecuritypassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get-electron-balance/${userId}`)
        .then((response) => {
          setMybalance(response.data.electron_balance);
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get-balance/${userId}`)
        .then((res) => {
          console.log(res.data);
          setFlexibleBalance(res.data.balance);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("no token found")
    }
  }, [])

  const transfer = () => {
    if (transferamount <= 0) {
      toast.error(`${t("Transfer amount must be more than 0")}`)
    } else if (transferamount > flexibleBalance) {
      toast.error(`${t("There is insufficient stock in your flexible wallet")}`)
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(true);
        const decoded: JwtPayload = jwtDecode(token);
        const userId = decoded.id;
        axios
          .post(`${process.env.REACT_APP_BACKEND_PORT}/api/transfermoney/${userId}`, { securityPassword: securitypassword, transferamount: transferamount })
          .then((response) => {
            setLoading(false);
            toast.success(`${t("Transfer is finished successufully")}`);
            navigate(-1);
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error?.response?.data?.message)
          }); // Optionally navigate away after success
      } else {
        toast.error(`${t("No token found.")}`);
      }
    }
  }

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
              <span className="trans-balance">Balance: {flexibleBalance}</span>
            </div>
          </div>
          <div className="trans-wallet-item">
            <img
              src={electron_wallet}
            />
            <div className="trans-wallet-details">
              <span>Electronic wallet</span>
              <span className="trans-balance">Balance: {mybalance}</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>TRANSFER AMOUNT</div>
        <div className="trans-transfer-amount">
          <input
            placeholder={t("Please enter the transfer amount")}
            type="number"
            value={transferamount === 0 ? "" : transferamount} // Removes 0 when input is active
            min={0}
            onChange={(e) => settransferamount(Number(e.target.value))}
            required
            onFocus={(e) => e.target.select()} // Automatically select all text on focus
            style={{
              MozAppearance: "textfield", // Firefox
            }}
          />
          <span className="trans-all-btn" onClick={() => settransferamount(flexibleBalance)}>All</span>
        </div>

        <div className="trans-security-password">
          <input placeholder="Security password"
            type={showNewPassword ? "text" : "password"} value={securitypassword} onChange={(e) => setsecuritypassword(e.target.value)}
            required />
          <button type="button" onClick={toggleShowNewPassword}>
            {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>{/* Eye icon for password visibility */}
        </div>

        <button className="trans-confirm-btn" onClick={transfer}>Confirm</button>
      </div>
      {loading && <CuteLoading />}
    </div>
  );
};

export default TransferAmount;
