import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpdatePassportInfo.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CuteLoading from "../CuteLoading/CuteLoading";
import { FaRegCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface JwtPayload {
  id: string;
}

interface PassportProps {
  setSelectedMenu: (data: any) => void
}

const UpdatePassportInfo: React.FC<PassportProps> = ({ setSelectedMenu }) => {
  const [passportNumber, setPassportNumber] = useState("");
  const [passportImage, setPassportImage] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const token = localStorage.getItem("token");
  const [verificated, setverificated] = useState<string>("<none>");

  useEffect(() => {
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_PORT}/api/get-passport/${userId}`
        )
        .then((response) => {
          setverificated(response.data.passport_verificated);
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });
    } else {
      console.log("no token found");
    }
  }, []);

  const handlePassportNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassportNumber(e.target.value);
  };

  const handlePassportImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setPassportImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassportPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected or file type is invalid.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!passportImage) {
      toast.error(`${t("You have to upload your passport image")}`)
    } else {
      setLoading(true);
      if (token) {
        const decoded: JwtPayload = jwtDecode(token);
        const userId = decoded.id;

        const formData = new FormData();
        formData.append(`userId`, `${userId}`);
        formData.append("passportNumber", passportNumber);
        if (passportImage) {
          formData.append("passportImage", passportImage);
        }

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_PORT}/api/update-passport`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          setMessage(response.data.message);
        } catch (error) {
          setMessage(`${t("Error updating passport info.")}`);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No token found");
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    navigate("/", { state: { fromService: true } });
  };

  return (
    <div>
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft />
      </button>
      {verificated === "<none>" ? <></> :
        (verificated !== "verified" ? (
          <div>
            <h2 style={{ marginTop: "100px" }}>{t("Passport Information")}</h2>
            <form className="up_pa_passport-form" onSubmit={handleSubmit}>
              <div className="up_pa_form-group">
                <label htmlFor="passportNumber">{t("Passport Number")}</label>
                <input
                  type="text"
                  id="passportNumber"
                  value={passportNumber}
                  onChange={handlePassportNumberChange}
                  required
                />
              </div>

              <div className="up_pa_form-group">
                <label htmlFor="passportImage">{t("Upload Passport Image")}</label>
                <input
                  type="file"
                  id="passportImage"
                  accept="image/*"
                  onChange={handlePassportImageChange}
                />
              </div>

              {passportPreview && (
                <div className="up_pa_image-preview">
                  <h3>{t("Preview")}</h3>
                  <img src={passportPreview} alt="Passport Preview" />
                </div>
              )}

              <button
                type="submit"
                className="up_pa_submit-button"
                disabled={loading}
              >
                {t("Update Passport Info")}
              </button>

              {message && <p className="up_pa_message">{message}</p>}
            </form>
          </div>
        ) : (
          <div>
            <h2 style={{ marginTop: "100px" }}>{t("Passport Information")}</h2>
            <div className="al_verificated">
              <div className="al_icon">
                <FaRegCheckCircle color="green" fontSize={"25px"} />
              </div>
              <h2>{t("You are already verificated")}</h2>
            </div>
          </div>
        ))}

      {loading && <CuteLoading />}
    </div>
  );
};

export default UpdatePassportInfo;
