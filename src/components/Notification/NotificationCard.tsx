import React, { useContext, useState } from "react";
import "./NotificationCard.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { MyContext } from "../../MyContext";
import CuteLoading from "../CuteLoading/CuteLoading";
import { Modal } from "antd";
import Password from "antd/es/input/Password";
import { useTranslation } from "react-i18next";

interface NotificationData {
  title: string;
  date: string;
  content: string;
  senderEmail: string;
  senderFirstName: string;
  senderLastName: string;
  createdAt: string;
  userId: string;
  messageId: number;
  senderId: number;
}

type NotificationProps = {
  title: string;
  date: string;
  content: string;
  senderId: number;
  senderFirstName: string;
  senderLastName: string;
  senderEmail: string;
  createdAt: string;
  userId: string;
  messageId: number;
  setMessages: (messages: NotificationData[]) => void;
};

const NotificationCard: React.FC<NotificationProps> = ({
  title,
  content,
  createdAt,
  senderFirstName,
  senderLastName,
  senderEmail,
  userId,
  messageId,
  setMessages,
  senderId
}) => {
  const date = new Date(createdAt).toLocaleString("en-US");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [balance, setbalance] = useState("")
  const [passport_number, setpassport_number] = useState("")
  const [passport_image_path, setpassport_image_path] = useState("")
  const [passport_verificated, setpassport_verificated] = useState("")
  const [package_price, setpackage_price] = useState("")
  const [package_role, setpackage_role] = useState("")
  const [package_status, setpackage_status] = useState("")
  const [balance_increase_start, setbalance_increase_start] = useState("")
  const [balance_increase_end, setbalance_increase_end] = useState("")
  const [buy_at, setbuy_at] = useState("")
  const [button_clicks, setbutton_clicks] = useState("")
  const [package_remain, setpackage_remain] = useState("")
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [email, setemail] = useState("")
  const [phonenumber, setphonenumber] = useState("")

  const handleDelete = () => {
    setLoading(true);
    if (userId) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/message-delete/${messageId}`, {
          userId: userId,
        })
        .then((response) => {
          setLoading(false);
          setMessages(response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching messages", error);
        });
    } else {
      console.log("No token found.");
    }
  };


  const toKnow = (senderId: number) => {
    setLoading(true)
    axios
      .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get_user_id/${senderId}`)
      .then((response) => {
        console.log(response.data)
        setLoading(false);
        setOpen(true)
        setbalance(response.data.balance)
        setpassport_number(response.data.passport_number)
        setpassport_image_path(response.data.passport_image_path)
        setpassport_verificated(response.data.passport_verificated)
        setpackage_price(response.data.package_price)
        setpackage_role(response.data.package_role)
        setpackage_status(response.data.package_status)
        setbalance_increase_start(response.data.balance_increase_start)
        setbalance_increase_end(response.data.balance_increase_end)
        setbuy_at(response.data.buy_at)
        setbutton_clicks(response.data.button_clicks)
        setpackage_remain(response.data.package_remain)
        setfirstname(response.data.firstname)
        setlastname(response.data.lastname)
        setemail(response.data.email)
        setphonenumber(response.data.phonenumber)
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching messages", error);
      });
  }

  function extractDate(timestamp: string): string {
    // Split the timestamp at the space to separate date and time
    const [date] = timestamp.split(' ');

    // Return only the date part
    return date;
  }

  return (
    <div className="card-notification">
      <div className="card-notification-header">
        <div className="card-notification-title-section">
          <h3 className="card-notification-title">{title}</h3>
          <button className="trash-button" onClick={handleDelete}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
      <div className="card-notification-content-container">
        <p className="card-notification-content" dangerouslySetInnerHTML={{ __html: content }}></p>
        {userId == "1" ?
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "10px" }}>
            <button className="confirm-button" onClick={() => toKnow(senderId)}>{t("to know about this user")}</button>
            <p className="card-notification-date">{date}</p>
          </div> : <p className="card-notification-date">{date}</p>
        }
      </div>
      {loading && <CuteLoading />}
      <Modal
        title={t("User Information")}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={300}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}></div>
        <p style={{ color: "#222", textAlign: "left", margin: "5px" }}>{t("Firstname")}: {" "}{firstname}</p>
        <p style={{ color: "#222", textAlign: "left", margin: "5px" }}>{t("Lastname")}: {" "}  {lastname}</p>
        {email &&
          <p style={{ color: "#222", textAlign: "left", margin: "5px" }}>{t("Email")}: {" "}  {email}</p>}
        {phonenumber &&
          <p style={{ color: "#222", textAlign: "left", margin: "5px" }}>{t("Phonenumber")}: {" "}  {phonenumber}</p>}
        <p style={{ color: "#222", textAlign: "left", margin: "5px" }}>{t("Balance")}: {" "}  ${balance}</p>
        <p style={{ color: "#222", textAlign: "left", margin: "5px" }}>{t("Passport verificated")}: {" "}  {passport_verificated}</p>
        {package_status &&
          <p style={{ color: "#222", textAlign: "left", margin: "5px" }}>{t("Buy")} ${package_price} {t("package at")} {extractDate(buy_at)} {t("and")} {package_remain} {t("days are left")}</p>}
        <p style={{ color: "#222", textAlign: "left", margin: "5px" }}>{t("Clicked")} {button_clicks} {t("times today")}</p>
      </Modal>
    </div>
  );
};

export default NotificationCard;
