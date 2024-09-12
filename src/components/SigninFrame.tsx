import React, { useState, FormEvent } from "react";
import "./SigninFrame.css";
import toast, { Toaster } from "react-hot-toast";
import mining from "../assets/mining.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SigninFrame: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState("email");
  const { setIsAuthenticated } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegistrationMethodChange = (method: string) => {
    setRegistrationMethod(method);
  };

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    // Consistent name attributes with what the code expects
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;
    const contactInfo =
      registrationMethod === "email"
        ? (form.elements.namedItem("email") as HTMLInputElement)?.value
        : (form.elements.namedItem("phoneNumber") as HTMLInputElement)?.value;

    if (!contactInfo)
      toast.error(
        `${
          registrationMethod.charAt(0).toUpperCase() +
          registrationMethod.slice(1)
        } is required`
      );
    else if (!password) toast.error("Password is required");
    else {
      axios
        .post("http://localhost:5000/api/login", {
          contactInfo,
          password,
        })
        .then((response) => {
          toast.success("Registration successful");
          setIsAuthenticated(true);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">Sign In</h1>
      <form className="form" onSubmit={validateForm}>
        <img src={mining} style={{ width: "150px", marginBottom: "1rem" }} />
        {/* Registration Method Selector */}
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
            <input name="email" placeholder="Email" />
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
