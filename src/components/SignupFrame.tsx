import React, { useState, FormEvent } from "react";
import "./SignupFrame.css";
import toast, { Toaster } from "react-hot-toast";
import mining from "../assets/mining.png";
import axios from "axios";
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

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    // Consistent name attributes with what the code expects
    const firstName = (form.elements.namedItem("firstname") as HTMLInputElement)
      ?.value;
    const lastName = (form.elements.namedItem("lastname") as HTMLInputElement)
      ?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    )?.value;
    const contactInfo =
      registrationMethod === "email"
        ? (form.elements.namedItem("email") as HTMLInputElement)?.value
        : (form.elements.namedItem("phoneNumber") as HTMLInputElement)?.value;

    if (!firstName) toast.error("First name is required");
    else if (!lastName) toast.error("Last name is required");
    else if (!contactInfo)
      toast.error(
        `${
          registrationMethod.charAt(0).toUpperCase() +
          registrationMethod.slice(1)
        } is required`
      );
    else if (!password) toast.error("Password is required");
    else if (password !== confirmPassword)
      toast.error("Passwords do not match");
    else {
      console.log("Form submitted successfully");
      axios
        .post("http://localhost:5000/api/register", {
          firstName,
          lastName,
          password,
          contactInfo,
          role: "user",
        })
        .then((response) => {
          toast.success("Registration successful");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="register-container">
      <h1 className="title">Sign Up</h1>
      <form className="form" onSubmit={validateForm}>
        <img src={mining} style={{ width: "150px", marginBottom: "1rem" }} />
        {/* Registration Method Selector */}
        <div className="registration-method">
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

        <div className="input-group password-input">
          <input type="text" name="firstname" placeholder="First Name" />
          <input type="text" name="lastname" placeholder="Last Name" />
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
