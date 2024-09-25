import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, message, Modal } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/mining.png";
import SignupFrame from "./SignupFrame";
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
  const [userId, setuserId] = useState(""); // State for invitation code
  const { code } = useParams<{ code: string }>();

  const extractNumbers = (str: string) => {
    if (str.startsWith('137') && str.endsWith('376')) {
      const between = str.slice(3, -3);  // Get the substring between '137' and '376'

      // Check if the extracted part is all digits
      if (/^\d+$/.test(between)) {
        return between; // Return the digits
      }
    }
    return null;  // Return null if conditions are not met
  };

  useEffect(() => {
    if (code !== undefined) {
      const extracted = extractNumbers(code);
      setuserId(extracted !== null ? extracted : '');
    }
  }, [code])

  useEffect(() => {
    if (userId === '') return;
    
    axios
      .post(`${process.env.REACT_APP_BACKEND_PORT}/api/update_invites/${userId}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  }, [userId])

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <SignupFrame />
    </div>
  );
};

export default Register;
