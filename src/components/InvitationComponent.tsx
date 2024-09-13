import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Ensure you have this installed
import './InvitationComponent.css'; // Import the CSS file

const InvitationComponent: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const invitationCode = '825389';
  const invitationLink = `https://kwtvokvip.cc/#/reg?ic=${invitationCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="inv_container">
      <div className="item">
        <label className="label">Invitation Code</label>
        <div className="code-container">
          <span className="code">{invitationCode}</span>
          <button
            className="copy-button"
            onClick={() => copyToClipboard(invitationCode)}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="item">
        <label className="label">Invitation Link</label>
        <div className="link-container">
          <span className="link">{invitationLink}</span>
          <button
            className="copy-button"
            onClick={() => copyToClipboard(invitationLink)}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="item">
        <QRCodeSVG value={invitationLink} size={150} />
      </div>

      {isCopied && <div className="copied-message">Copied to clipboard!</div>}
    </div>
  );
};

export default InvitationComponent;
