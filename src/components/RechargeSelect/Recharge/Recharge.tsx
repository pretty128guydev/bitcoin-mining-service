import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Recharge.css"; // We'll write CSS for styling
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";

interface RechargeProps {
  mainnetType: string;
  depositAddress: string;
  qrCodeUrl: string;
}

const Recharge: React.FC<RechargeProps> = ({
  mainnetType,
  depositAddress,
  qrCodeUrl,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  const [usdAmount, setUsdAmount] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [cryptoPrices, setCryptoPrices] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [swappedPrice, setSwappedPrice] = useState<string>("");

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
    // Confirm deposit logic
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
        console.error("Error fetching crypto prices:", error);
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
        <span className="title">{t("Recharge")}</span>
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
              Deposit Amount:
              <input
                id="amount"
                type="number"
                value={usdAmount}
                onChange={handleInputChange}
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
              Your Wallet Address:
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
          {t("Deposit Complete")}
        </button>

        {cryptoPrices && (
          <div>
            <h2>Equivalent Cryptocurrency Prices:</h2>
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
          message={`Confirm deposit of $${usdAmount} to ${walletAddress}?   (${swappedPrice} ${mainnetType})`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Recharge;
