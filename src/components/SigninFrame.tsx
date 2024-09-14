import React, { useState, FormEvent } from "react";
import "./SigninFrame.css";
import toast, { Toaster } from "react-hot-toast";
import mining from "../assets/mining.png";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SigninFrame: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState("email");
  const { setIsAuthenticated } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistrationMethodChange = (method: string) => {
    setRegistrationMethod(method);
  };

  const validateForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;
    const contactInfo =
      registrationMethod === "email"
        ? (form.elements.namedItem("email") as HTMLInputElement)?.value
        : (form.elements.namedItem("phoneNumber") as HTMLInputElement)?.value;

    if (!contactInfo)
      return toast.error(
        `${
          registrationMethod.charAt(0).toUpperCase() +
          registrationMethod.slice(1)
        } is required`,
        {
          duration: 4000,
        }
      );
    if (!password)
      return toast.error("Password is required", {
        duration: 4000,
      });

    const loadingToastId = toast.loading("Logging in...", {
      duration: 6000,
    });

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        [registrationMethod]: contactInfo,
        password,
      });

      const { token, role, firstName, lastName } = response.data;

      toast.success(`Welcome ${firstName || lastName || "User"}'s login!`, {
        id: loadingToastId,
        duration: 5000,
      });

      setIsAuthenticated(true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/");
    } catch (error) {
      let errorMessage = "Login failed";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        id: loadingToastId,
        duration: 4000,
      });
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">Sign In</h1>
      <form className="form" onSubmit={validateForm}>
        <img
          src={mining}
          style={{ width: "150px", marginBottom: "1rem" }}
          alt="mining"
        />
        {/* Login Method Selector */}
        <div className="login-method">
          <button
            type="button"
            className={`selector-button ${
              registrationMethod === "email" ? "active" : ""
            }`}
            onClick={() => handleRegistrationMethodChange("email")}
          >
            Email
          </button>
          <button
            type="button"
            className={`selector-button ${
              registrationMethod === "phoneNumber" ? "active" : ""
            }`}
            onClick={() => handleRegistrationMethodChange("phoneNumber")}
          >
            Mobile
          </button>
        </div>

        {/* Conditionally Render Email or Phone Number Input */}
        {registrationMethod === "email" ? (
          <div className="input password-input">
            <input type="email" name="email" placeholder="Email" />
          </div>
        ) : (
          <div className="input password-input">
            <input type="tel" name="phoneNumber" placeholder="Phone Number" />
          </div>
        )}

        <div className="input password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <button
            type="button"
            className="show-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="submit-button">
          Sign In
        </button>
        <div className="footer">
          <p>
            No Account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SigninFrame;
