import React, { useState } from 'react';
import './SecurityPassword.css';
import { useTranslation } from 'react-i18next';

const SecurityPassword: React.FC = () => {
  const [currentSecurityPassword, setCurrentSecurityPassword] = useState('');
  const [newSecurityPassword, setNewSecurityPassword] = useState('');

  const handleChangeSecurityPassword = () => {
    alert(t('Security password updated successfully!'));
  };
  const { t } = useTranslation();

  return (
    <div className="security-password-container">
      <h1>{t("Change Security Password")}</h1>
      <p>{t("For enhanced security, update your transaction password.")}</p>

      <input
        type="password"
        placeholder={t("Current Security Password")}
        className="password-input"
        value={currentSecurityPassword}
        onChange={(e) => setCurrentSecurityPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder={t("New Security Password")}
        className="password-input"
        value={newSecurityPassword}
        onChange={(e) => setNewSecurityPassword(e.target.value)}
      />
      
      <button className="change-password-btn" onClick={handleChangeSecurityPassword}>
        {t("Update Security Password")}
      </button>
    </div>
  );
};

export default SecurityPassword;
