import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Ensure you have this installed
import './InvitationComponent.css'; // Import the CSS file
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';
import logo from "../assets/logo.png";

const InvitationComponent: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [invitationCode, setinvitationCode] = useState<string>("");
  const invitationLink = `https://myminings.com/#/register/${invitationCode}`;
  const { t } = useTranslation();


  interface JwtPayload {
    id: string;
    // Add other properties that you expect in your JWT payload
  }


  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      const text = `137${userId}376`
      setinvitationCode(text)
    } else {
      console.log("no token found")
    }
  }, [])

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="inv_container">
      {/* <div className="item">
        <label className="label">{t("Invitation Code")}</label>
        <div className="code-container">
          <span className="code">{invitationCode}</span>
          <button
            className="copy-button"
            onClick={() => copyToClipboard(invitationCode)}
          >
            {t("Copy")}
          </button>
        </div>
      </div> */}

      <div className="item">
        <label className="label">{t("Invitation Link")}</label>
        <div className="link-container">
          <span className="link">{invitationLink}</span>
          <button
            className="copy-button"
            onClick={() => copyToClipboard(invitationLink)}
          >
            {t("Copy")}
          </button>
        </div>
      </div>

      <div className="item" style={{ marginTop: '30px', display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "175px", height: "175px", borderRadius: "15px", background: "#fff" }}>
          <QRCodeSVG value={invitationLink} size={150} />
          <img src={logo} style={{ marginLeft: "10px", width: "55px", height: "55px", position: "absolute" }} />
        </div>
      </div>

      {isCopied && <div className="copied-message">{t("Copied to clipboard!")}</div>}
    </div>
  );
};

export default InvitationComponent;
