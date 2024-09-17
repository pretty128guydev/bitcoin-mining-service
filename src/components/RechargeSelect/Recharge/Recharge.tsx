import React from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Recharge.css"; // We'll write CSS for styling

const Recharge: React.FC = () => {
  const depositAddress = "TR7kbVZnRByZpoMrf4YrLQ4aJi6FQbaZ5c";

  return (
    <div className="recharge-container">
      <div className="header">
        <img
          src="https://api.kwtvokvip.cc/static/image/trc20-usdt.jpg"
          alt="TRC20 USDT"
          className="logo"
        />
        <div className="network-selection">Select Mainnet</div>
        <div className="mainnet-name">TRC20-USDT</div>
      </div>

      <div className="qrcode-section">
        <div className="qrcode-wrapper">
          <QRCodeSVG value={depositAddress} size={140} />
        </div>
      </div>

      <div className="address-section">
        <div className="name">Deposit Address</div>
        <div className="address-box">
          <div className="address">{depositAddress}</div>
          <button
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(depositAddress)}
          >
            Copy
          </button>
        </div>
      </div>

      <button className="recharge-complete-btn">Recharge Complete</button>

      <div className="warm-reminder">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIQSURBVHgBxZfNTttAEMfHeQA7t6qS05pDP9RecqBV00u5oZ7aN6grXiAPANh3EOSMQIIbcOINCAc4IxEkOMXE3CF+gWFm2YBjCfCME/GTJuuNvTt/z+7YYwcEIOIcNb/ImtaC3OnE2hHZgeM4pzBJyHlIdogy+jwOqsJ3bierQt9GUCUgwskSSQWs43RYLysgwukSvSQglMw2HA7x+OTEtELaTwkIyG7KzjIYDPDDpy/45q2Ps99b2Ov1UAD7CUa+azkdMVkdSrIcxZBlmTlO0xQ2NrdAAPuJxkRYVf+gAtkwkw7hpa8/iCDaIMR1vbF+o+GDgnZexB8QUnTqui4oMNGv2aUIQEjD9wuiGqCAkyHgSDRBget5z4oS0GQRASh4V1gOz1MtB2MiUTot8xT3gHI5mHoNlBSdKjemgUXcgpLRPlCm54hbFpGAkp+tlml/z89DBRLHpmgflKTpddVIzJhfEpKggpXVNQz/L+Du3j4qebx56sQoZHEpNm/QkXFfQYf9O1YEp+kNCPj4+evDW5TxKDsuL85ByAxV5YlJUTrgDNmRjC7uA1/+nNhmAWP/oLCoOTvr4ey3H2YpuLjhvoCxoqYopC2ZyZR3x6ryLoTnQMUmFRJDGejCDk6HDkjAyUckBg00sImv+RlYEBOiXEwXS34QOyCAI0PNX7I5uC+G3udOX5GdWuvSM6ALJbkD+2kAQ2g/9GwAAAAASUVORK5CYII="
          alt="Reminder Icon"
          className="reminder-icon"
        />
        <div className="reminder-text">
          <p>1. Copy the address above or scan the QR code and select Tron (TRC20) network to deposit USDT.</p>
          <p>2. Please do not recharge other non-Tron(TRC20)-USDT assets.</p>
          <p>3. If it does not arrive for a long time, please refresh the page or contact customer service.</p>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
