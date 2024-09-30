// InfoMenu.tsx
import React, { useState, useEffect } from "react";
import './InfoMenu.css';
import CuteLoading from "../CuteLoading/CuteLoading";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";


interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const InfoMenu: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [electronic_wallet, setelectronic_wallet] = useState<number>(0);
  const [flexible_wallet, setflexible_wallet] = useState<number>(0);
  const [gold_coin, setgold_coin] = useState<number>(0);
  const [total_income, settotal_income] = useState<number>(0);
  const [total_commission_fee, settotal_commission_fee] = useState<number>(0);
  const [total_team_size, settotal_team_size] = useState<number>(0);
  const [cumulative_withdrawal, setcumulative_withdrawal] = useState<number>(0);
  const [cumulative_recharge, setcumulative_recharge] = useState<number>(0);
  const [useremail, setuseremail] = useState<string>("");
  const [userphoneNumber, setuserphoneNumber] = useState<string>("");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/", { state: { fromService: true } });
  };

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get_user_id/${userId}`)
        .then((response) => {
          setLoading(false);
          console.log(response.data)
          // setelectronic_wallet(response.data.)
          // setflexible_wallet(response.data.)
          setgold_coin(response.data.gold_coin)
          // settotal_income(response.data.)
          // settotal_commission_fee(response.data.)
          settotal_team_size(response.data.invites)
          setcumulative_withdrawal(response.data.all_withdraw)
          setcumulative_recharge(response.data.first_investment)
          setuseremail(response.data.email)
          setuserphoneNumber(response.data.phoneNumber)
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching messages", error);
        });
    } else {
      console.log(`No token found.`);
    }
  }, [])

  return (
    <div className="info-dashboard-container">
      {useremail && <h3 style={{ color: "#fff", textAlign: "left" }}>{useremail}</h3>}
      {userphoneNumber && <h3 style={{ color: "#fff", textAlign: "left" }}>{userphoneNumber}</h3>}
      <div className="info-wallet-section">
        <div className="info-wallet">
          <div className="info-wallet-amount">0.00</div>
          <div className="info-wallet-title">Electronic wallet (USDT)</div>
        </div>
        <div className="info-wallet" onClick={() => navigate("/wallet")}>
          <div className="info-wallet-amount">0.00</div>
          <div className="info-wallet-title">Flexible wallet (USDT)</div>
        </div>
        <div className="info-wallet">
          <div className="info-wallet-amount">{gold_coin}</div>
          <div className="info-wallet-title">Gold coin</div>
        </div>
      </div>

      <div className="info-income-section">
        <div className="info-income-row1">
          <div className="info-income-box">
            <div className="info-income-amount">0.00</div>
            <div className="info-income-title">Total Income (USDT)</div>
          </div>
          <div className="info-income-box">
            <div className="info-income-amount">0</div>
            <div className="info-income-title">Total commission fee</div>
          </div>
        </div>
        <div className="info-income-row2">
          <div className="info-income-box">
            <div className="info-income-amount">{cumulative_recharge}</div>
            <div className="info-income-title">Cumulative recharge (USDT)</div>
          </div>
          <div className="info-income-box">
            <div className="info-income-amount">{cumulative_withdrawal}</div>
            <div className="info-income-title">Cumulative withdrawal (USDT)</div>
          </div>
          <div className="info-income-box">
            <div className="info-income-amount">{total_team_size}</div>
            <div className="info-income-title">Total team size</div>
          </div>
        </div>
      </div>
      {loading && <CuteLoading />}
    </div>
  );
};

export default InfoMenu;
