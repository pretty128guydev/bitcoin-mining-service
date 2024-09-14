import React, { useState } from "react";
import "./LoginPassword.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}

const LoginPassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Decode the token with the specified type
        const decoded: JwtPayload = jwtDecode(token);

        // Now TypeScript knows that `decoded` has an `id` property
        const userId = decoded.id;

        console.log(decoded);
        const response = await axios.post(
          "http://localhost:5000/api/change-password", // Update with your backend endpoint
          { userId, oldPassword, newPassword },
          {
            headers: { Authorization: `Bearer ${token}` },
          } // Assuming you use JWT for auth
        );

        toast.success("Password changed successfully.");
        // Optionally navigate away or clear fields
        navigate("/login"); // Redirect to login or another page if needed
      } else {
        toast.error("No token found.");
      }
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="password-change-container">
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div className="password-field">
          <input
            placeholder="Old login password"
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
            placeholder="New login password"
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
            placeholder="Confirm new password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="button" onClick={toggleShowConfirmPassword}>
            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <button className="confirm-button" type="submit">
          Confirm
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LoginPassword;
