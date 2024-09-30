import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Recharge.css"; // We'll write CSS for styling
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import axios from "axios";
import CuteLoading from "../../CuteLoading/CuteLoading";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

interface RechargeProps {
  mainnetType: string;
  depositAddress: string;
  qrCodeUrl: string;
}

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const Recharge: React.FC<RechargeProps> = ({
  mainnetType,
  depositAddress,
  qrCodeUrl,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleBack = () => {
    navigate(-1)
  };

  const [usdAmount, setUsdAmount] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [cryptoPrices, setCryptoPrices] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [swappedPrice, setSwappedPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Load wallet address from localStorage when the component mounts
  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
  }, []);

  // Handle deposit amount input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUsdAmount(isNaN(value) ? 0 : value);
  };

  // Handle wallet address input change and save to localStorage
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWalletAddress(value);
    localStorage.setItem("walletAddress", value); // Save to localStorage
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    const token = localStorage.getItem("token");
    // Decode the token with the specified type
    if (token) {
      setLoading(true);
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;

      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get-balance/${userId}`)
        .then((response) => {
          if (response.data.balance > usdAmount) {
            const read_status = "unread";
            const recipientId = 1;
            const content = `${t("I want to withdraw")} $${usdAmount} ${t("to my address")}(${walletAddress}) 
                       ${t("swappedPrice as")} ${mainnetType}: ${swappedPrice}`

            axios
              .post(`${process.env.REACT_APP_BACKEND_PORT}/api/withdrawsend`, {
                userId,
                recipientId,
                content,
                read_status,
                usdAmount
              })
              .then(() => {
                setLoading(false);
                toast.success(`${t("Message sent to admin successfully.")}`);
                setModalVisible(false)
              })
              .catch(() => {
                setLoading(false);
                toast.error(t("Failed to send message."));
              });
          } else {
            toast.error(t("There is insufficient stock."));
          }
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });


      // Now TypeScript knows that `decoded` has an `id` property

    } else {
      console.log("no token found")
    }
  };

  // Fetch crypto prices when component mounts
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=tron,binancecoin,tether&vs_currencies=usd"
        );
        const data = await response.json();
        setCryptoPrices(data);
      } catch (error) {
        console.error("Error fetching crypto prices", error);
      }
    };

    fetchCryptoPrices();
  }, []);

  const deposit = () => {
    if (cryptoPrices) {
      let swappedAmount = "0";

      // Calculate the swapped price based on the selected mainnet type
      if (usdAmount > 0) {
        switch (mainnetType) {
          case "TRC20-USDT":
          case "BEP20-USDT":
            swappedAmount = (usdAmount / cryptoPrices.tether.usd).toFixed(6);
            break;
          case "TRX":
            swappedAmount = (usdAmount / cryptoPrices.tron.usd).toFixed(6);
            break;
          case "BNB":
            swappedAmount = (usdAmount / cryptoPrices.binancecoin.usd).toFixed(
              6
            );
            break;
          default:
            swappedAmount = "0";
        }
      }

      // Set the swapped price to display in the modal
      setSwappedPrice(swappedAmount);
    }
    setModalVisible(true);
  };

  return (
    <div className="recharge-body">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <div className="header">
        <span className="title">{t("Withdraw")}</span>
      </div>
      <div className="logo">
        <img src={qrCodeUrl} alt="TRC20 USDT" />
      </div>
      <div className="recharge-container">
        <div className="recharge-header">
          <div className="mainnet-name">{mainnetType}</div>
        </div>

        <div className="address-section">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ width: "100%", marginBottom: "10px" }}>
              {t("Withdraw Amount")}
              <input
                id="amount"
                type="number"
                value={usdAmount}
                min={0}
                onChange={handleInputChange}
                placeholder="0"
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              />
            </label>
            <label style={{ width: "100%" }}>
              {t("Your Wallet Address")}
              <input
                id="walletAddress"
                type="text"
                value={walletAddress}
                onChange={handleAddressChange}
                style={{
                  width: "100%",
                  height: "35px",
                  borderRadius: "5px",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              />
            </label>
          </div>
        </div>

        <button className="recharge-complete-btn" onClick={deposit}>
          {t("Withdraw Complete")}
        </button>

        {cryptoPrices && (
          <div>
            <h2>{t("Equivalent Cryptocurrency Prices")}</h2>
            {usdAmount > 0 && mainnetType === "TRC20-USDT" && (
              <p>
                TRC20-USDT:{" "}
                {isNaN(usdAmount)
                  ? "0"
                  : (usdAmount / cryptoPrices.tether.usd).toFixed(6)}{" "}
                USDT
              </p>
            )}
            {usdAmount > 0 && mainnetType === "BEP20-USDT" && (
              <p>
                BEP20-USDT:{" "}
                {isNaN(usdAmount)
                  ? "0"
                  : (usdAmount / cryptoPrices.tether.usd).toFixed(6)}{" "}
                USDT
              </p>
            )}
            {usdAmount > 0 && mainnetType === "TRX" && (
              <p>
                TRX:{" "}
                {isNaN(usdAmount)
                  ? "0"
                  : (usdAmount / cryptoPrices.tron.usd).toFixed(6)}{" "}
                TRX
              </p>
            )}
            {usdAmount > 0 && mainnetType === "BNB" && (
              <p>
                BNB:{" "}
                {isNaN(usdAmount)
                  ? "0"
                  : (usdAmount / cryptoPrices.binancecoin.usd).toFixed(6)}{" "}
                BNB
              </p>
            )}
          </div>
        )}
      </div>

      {modalVisible && (
        <ConfirmationModal
          message={`${t("Confirm withdraw of")} $${usdAmount} ${t("to")} ${walletAddress}?   (${swappedPrice} ${mainnetType})`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {loading && <CuteLoading />}
    </div>
  );
};

export default Recharge;
