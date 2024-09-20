import React from "react";
import "./Wallet_Connect.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TronWalletConnector from "../tronWallet/tronWalletConnector";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";

const Wallet_Connect: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { address, connected } = useWallet();
  const { unlockPrice } = useParams<{ unlockPrice: string }>();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const sendTron = async (toAddress: string, amount: number) => {
    try {
      const tronWeb = window.tronWeb;

      if (!tronWeb || !tronWeb.ready) {
        console.error("TronLink is not connected");
        return;
      }

      if (!tronWeb.isAddress(toAddress)) {
        console.error("Invalid recipient address.");
        return;
      }

      const balance = await tronWeb.trx.getBalance(
        tronWeb.defaultAddress.base58
      );
      if (balance < tronWeb.toSun(amount)) {
        console.error("Insufficient TRX balance.");
        return;
      }

      const transaction = await tronWeb.transactionBuilder.sendTrx(
        toAddress,
        tronWeb.toSun(amount),
        tronWeb.defaultAddress.base58
      );

      const signedTransaction = await tronWeb.trx.sign(transaction);
      const receipt = await tronWeb.trx.sendRawTransaction(signedTransaction);
      console.log("Transaction Receipt:", receipt);
    } catch (error) {
      console.error("Transaction Error:", error);
    }
  };

  return (
    <>
      <h2 className="wallet_connect-header">{t("Wallet Connect")}</h2>
      <div className="wallet_connect-container">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft />
        </button>
        <TronWalletConnector />
        <button
          onClick={() => sendTron("TGVkQLVWbYqQTNQ8QKweMoHBLyJoZemFHJ", 0.1)}
          className="go_transaction"
        >
          Send Transaction ${unlockPrice}
        </button>
        <p className="go_transaction">
          <span>Wallet is:</span> {connected ? "Connected" : "Disconnected"}
        </p>
        <p className="go_transaction">
          <span>Your Address:</span> {address}
        </p>
      </div>
    </>
  );
};

export default Wallet_Connect;
