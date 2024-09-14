import React, { useState } from 'react';
import './SecurityPassword.css';

const SecurityPassword: React.FC = () => {
  const [currentSecurityPassword, setCurrentSecurityPassword] = useState('');
  const [newSecurityPassword, setNewSecurityPassword] = useState('');

  const handleChangeSecurityPassword = () => {
    alert('Security password updated successfully!');
  };

  return (
    <div className="security-password-container">
      <h1>Change Security Password</h1>
      <p>For enhanced security, update your transaction password.</p>

      <input
        type="password"
        placeholder="Current Security Password"
        className="password-input"
        value={currentSecurityPassword}
        onChange={(e) => setCurrentSecurityPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Security Password"
        className="password-input"
        value={newSecurityPassword}
        onChange={(e) => setNewSecurityPassword(e.target.value)}
      />
      
      <button className="change-password-btn" onClick={handleChangeSecurityPassword}>
        Update Security Password
      </button>
    </div>
  );
};

export default SecurityPassword;
