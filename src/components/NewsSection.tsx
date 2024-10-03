import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsSection.css";
import useWindowSize from "../hooks/useWindowSize";
import bitcoin from "../assets/bitcoin.png";
import nonews from "../assets/nonews.svg";
import Loader from "../assets/Loader";
import lightning from "../assets/lightning.png";
import { useTranslation } from "react-i18next";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import { jwtDecode } from "jwt-decode";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import news1 from "../assets/news1.jpg"
import news2 from "../assets/news2.jpg"
import news3 from "../assets/news3.jpg"
import news4 from "../assets/news4.jpg"
import FizzyButton from "./FizzyButton";
import toast from "react-hot-toast";
import CuteLoading from "./CuteLoading/CuteLoading";

interface NewsItem {
  uuid: string;
  title: string;
  url: string;
  image_url: string;
}


interface JwtPayload {
  id: string;
  // Add other properties that you expect in your JWT payload
}


const NewsSection: React.FC = () => {
  const [imageurl, setimageurl] = useState<string>("https://t.me/MyMiningsOfficialChannel");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const width = useWindowSize() ?? 0;
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);


  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setModalVisible(false);
  };

  // State to track if the image is clicked or not
  const [isClicked, setIsClicked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [floatingNumbers, setFloatingNumbers] = useState<
    { value: number; left: string; top: string }[]
  >([]);
  const token = localStorage.getItem("token");


  const options = [
    {
      id: "1",
      image_url: news1,
      url: "https://t.me/MyMiningsOfficialChannel",
    },
    {
      id: "2",
      image_url: news2,
      url: "https://t.me/MyMiningsOfficialChannel",
    },
    {
      id: "3",
      image_url: news3,
      url: "https://t.me/MyMiningsOfficialChannel",
    },
    {
      id: "4",
      image_url: news4,
      url: "https://t.me/MyMiningsOfficialChannel",
    }
  ];

  useEffect(() => {
    // BUG: toast is popping 2 times.
    setLoading(true)
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;
      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get_package_status/${userId}`)
        .then((response) => {
          if (response.data === "active") {
            axios
              .post(`${process.env.REACT_APP_BACKEND_PORT}/api/get_clicked/${userId}`)
              .then((response) => {
                setLoading(false)
                if (response.data === "clicked") {
                  setIsButtonDisabled(true);
                }
              })
              .catch((error) => {
                setLoading(false)
                console.error("Error fetching messages", error);
              });
          } else {
            setLoading(false)
            toast.error(`${t("You didn't have bought any Package")}`)
            setIsButtonDisabled(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });

    } else {
      setLoading(false)
      console.log("no token found")
    }
  }, [])

  // Function to handle image click
  const handleImageClick = () => {
    // if (energy < 500) {

    // BUG: toast is popping 2 times.
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id;

      axios
        .post(`${process.env.REACT_APP_BACKEND_PORT}/api/button_clicks/${userId}`)
        .then((response) => {
          setTimeout(() => {
            toast.success(`You've get $${response.data.packagerole} today!`)
            setIsButtonDisabled(true);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error fetching messages", error);
        });

    } else {
      console.log("no token found");
    }
    // } else {
    //   setMessage(`${t("You've reached at 500 times Please try tomorrow.")}`)
    //   setModalVisible(true)
    // }
  };

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=IMc5zrj7jCeIq218grq7ibLPEalUFo4xcXC2kt7w"
  //       );
  //       setNewsItems(response.data.data);
  //     } catch (err) {
  //       setError("Failed to fetch news");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNews();
  // }, []);

  const onClickItem = (key: string) => {
    window.open(key);
  };

  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {/* {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}
      {error && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <img src={nonews} style={{ width: "100px" }} />
          <h2 style={{ color: "#ffffff" }}>{t("No Current News")}</h2>
        </div>
      )} */}
      {/* <div className="image-gallery">
        {newsItems.map((item) => (
          <div className="image-item" key={item.uuid}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img
                src={item.image_url}
                alt={item.title}
                style={{ width: width < 425 ? "200px" : "300px" }}
              />
            </a>
          </div>
        ))}
      </div> */}
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        showStatus={false}
        showThumbs={false}
        swipeable={true}
        useKeyboardArrows={true}
        dynamicHeight={true}
        stopOnHover={true}
        interval={3000}
      // onClickThumb={onClickThumb}
      >
        <div
          className="image-item-contnews1"
          onClick={() => onClickItem(imageurl)}
        >
        </div>
        <div
          className="image-item-contnews2"
          onClick={() => onClickItem(imageurl)}
        >
        </div>
        <div
          className="image-item-contnews3"
          onClick={() => onClickItem(imageurl)}
        >
        </div>
        <div
          className="image-item-contnews4"
          onClick={() => onClickItem(imageurl)}
        >
        </div>
      </Carousel>

      {/* Display floating numbers */}
      {/* <div className="floating-numbers">
        {floatingNumbers.map((number, index) => (
          <div
            key={index}
            className="floating-number"
            style={{
              animation: `float 1s ease-out ${index * 0.1}s`,
              left: number.left,
              top: number.top,
            }}
          >
            +{(2)}
          </div>
        ))}
      </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "0",
          marginBottom: "50px"
        }}
      >
        {/* <img
          onClick={handleImageClick}
          src={bitcoin}
          className={isClicked ? "bitcoin_button" : "bitcoin_button is-clicked"}
          style={{
            width: "200px",
            cursor: "pointer",
            transform: isClicked ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
            marginBottom: "25px"
          }}
        /> */}
        <FizzyButton isDisabled={isButtonDisabled} onClick={handleImageClick} />

        {/* <p
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#ffffff",
            padding: "00px 20px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease-in-out",
            transform: isClicked ? "scale(1.1)" : "scale(1)",
          }}
        >
          ${price.toFixed(8)}
        </p> */}
        {/* <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <img
            src={lightning}
            alt="Energy Icon"
            style={{ width: "30px", marginRight: "10px", marginTop: "10px" }}
          />
          <p
            style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: "bold" }}
          >
            {energy} / 500
          </p>
        </div> */}
        {/* <button className={energy < 500 ? "take_profit_out" :"take_profit"}>TAKE PROFIT</button> */}
      </div>
      {modalVisible && (
        <div>
          <ConfirmationModal
            message={message}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      )}
      {loading && <CuteLoading />}
    </div>
  );
};

export default NewsSection;
