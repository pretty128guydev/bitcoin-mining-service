import React, { useState, FormEvent } from "react";
import "./SignupFrame.css";
import toast, { Toaster } from "react-hot-toast";
import mining from "../assets/mining.png";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const SignupFrame: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState("email");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegistrationMethodChange = (method: string) => {
    setRegistrationMethod(method);
  };

  const validateForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const firstName = (form.elements.namedItem("firstname") as HTMLInputElement)?.value;
    const lastName = (form.elements.namedItem("lastname") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value;
    const contactInfo =
      registrationMethod === "email"
        ? (form.elements.namedItem("email") as HTMLInputElement)?.value
        : (form.elements.namedItem("phoneNumber") as HTMLInputElement)?.value;

    if (!firstName) return toast.error("First name is required", {
      duration: 4000,
    });
    if (!lastName) return toast.error("Last name is required", {
      duration: 4000,
    });
    if (!contactInfo) return toast.error(`${registrationMethod.charAt(0).toUpperCase() + registrationMethod.slice(1)} is required`, {
      duration: 4000,
    });
    if (!password) return toast.error("Password is required", {
      duration: 4000,
    });
    if (password !== confirmPassword) return toast.error("Passwords do not match", {
      duration: 4000,
    });

    const loadingToastId = toast.loading("Registering...", {
      duration: 6000,
    });

    try {
      await axios.post("http://localhost:5000/api/register", {
        firstName,
        lastName,
        password,
        [registrationMethod]: contactInfo,
        role: "user",
      });

      toast.success("Registration successful", {
        id: loadingToastId,
        duration: 4000,
      });
      navigate("/login");
    } catch (error) {
      let errorMessage = "Registration failed";

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
      <h1 className="title">Sign Up</h1>
      <form className="form" onSubmit={validateForm}>
        <img src={mining} style={{ width: "150px", marginBottom: "1rem" }} alt="mining" />
        {/* Registration Method Selector */}
        <div className="registration-method">
          <button
            type="button"
            className={`selector-button ${registrationMethod === "email" ? "active" : ""}`}
            onClick={() => handleRegistrationMethodChange("email")}
          >
            Email
          </button>
          <button
            type="button"
            className={`selector-button ${registrationMethod === "phoneNumber" ? "active" : ""}`}
            onClick={() => handleRegistrationMethodChange("phoneNumber")}
          >
            Mobile
          </button>
        </div>

        <div className="input-group password-input">
          <input type="text" name="firstname" placeholder="First Name" />
          <input type="text" name="lastname" placeholder="Last Name" />
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

        <div className="input password-input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <button
            type="button"
            className="show-button"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="submit-button">
          Sign Up
        </button>
        <div className="footer">
          <p>
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignupFrame;
