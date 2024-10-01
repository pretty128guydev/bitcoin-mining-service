import React, { useState, useEffect } from "react";
import "./SecurityPassword.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import CuteLoading from "../CuteLoading/CuteLoading";

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const SecurityPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasSecurityPassword, setHasSecurityPassword] = useState<string>("<none>"); // New state to track existing password
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSecurityPassword = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token");
        if (token) {
          const decoded: JwtPayload = jwtDecode(token);
          const userId = decoded.id;
          axios.post(
            `${process.env.REACT_APP_BACKEND_PORT}/api/get_security_password/${userId}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          ).then((res) => {
            setLoading(false)
            console.log(res.data)
            if (res.data.result) {
              setHasSecurityPassword("true")
            }
          }
          ).catch((error) => {
            setLoading(false);
            setHasSecurityPassword("false")
            console.error("Error fetching messages", error);
          });
        } else {
          setLoading(false)
          toast.error(`${t("No token found.")}`);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || `${t("An error occurred.")}`);
      }
    };

    checkSecurityPassword();
  }, []);

  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleBack = () => {
    navigate("/", { state: { fromService: true } });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(`${t("New password and confirmation do not match.")}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded: JwtPayload = jwtDecode(token);
        const userId = decoded.id;
        const endpoint = hasSecurityPassword === "true"
          ? "/api/change_security_password"
          : "/api/create_security_password";

        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_PORT}${endpoint}/${userId}`,
          {
            oldPassword: hasSecurityPassword === "true" ? oldPassword : undefined, // Only send oldPassword if security password exists
            newPassword
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        toast.success(`${t("Password changed successfully.")}`);
        navigate("/"); // Optionally navigate away after success
      } else {
        toast.error(`${t("No token found.")}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || `${t("An error occurred.")}`);
    }
  };

  return (
    <div className="password-change-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>{t("Security Password")}</h2>
      {hasSecurityPassword === "<none>" ? <></> : hasSecurityPassword === "true" ? (
        <form onSubmit={handlePasswordChange}>
          <div className="password-field">
            <input
              placeholder={t("Old security password")}
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button type="button" onClick={toggleShowOldPassword}>
              {showOldPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="password-field">
            <input
              placeholder={t("New security password")}
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="button" onClick={toggleShowNewPassword}>
              {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="password-field">
            <input
              placeholder={t("Confirm new password")}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="button" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button className="confirm-button" type="submit">
              {t("Confirm")}
            </button>
          </div>
        </form>) : (<form onSubmit={handlePasswordChange}>
          <div className="password-field">
            <input
              placeholder={t("New security password")}
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="button" onClick={toggleShowNewPassword}>
              {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div className="password-field">
            <input
              placeholder={t("Confirm new password")}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="button" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button className="confirm-button" type="submit">
              {t("Confirm")}
            </button>
          </div>
        </form>
      )}
      {loading && <CuteLoading />}
    </div>
  );
};

export default SecurityPassword;
