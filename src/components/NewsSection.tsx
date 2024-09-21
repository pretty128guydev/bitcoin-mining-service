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

interface NewsItem {
  uuid: string;
  title: string;
  url: string;
  image_url: string;
}

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(0);
  const width = useWindowSize() ?? 0;
  const { t } = useTranslation();

  // State to track if the image is clicked or not
  const [isClicked, setIsClicked] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState<
    { value: number; left: string; top: string }[]
  >([]);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  // Function to handle image click
  const handleImageClick = () => {
    setIsClicked(true); // Start animation effect

    // Update price and add a floating number with random position
    const newNumber = {
      value: price + 0.00000257,
      left: `${Math.random() * 100}%`, // Random horizontal position
      top: `${Math.random() * 100}px`, // Random vertical position
    };

    setPrice(newNumber.value);
    setEnergy((prev) => Math.min(prev + 1, 500));
    setFloatingNumbers((prev) => [...prev, newNumber]);

    // Stop shaving animation after a short delay
    setTimeout(() => {
      setIsClicked(false);
    }, 500); // Duration of the shaving effect
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=IMc5zrj7jCeIq218grq7ibLPEalUFo4xcXC2kt7w"
        );
        setNewsItems(response.data.data);
      } catch (err) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const onClickItem = (key: string) => {
    window.open(key);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        position: "relative", // Ensure that floating numbers are positioned relative to this container
      }}
    >
      {loading && (
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
          <h2 style={{ color: "#ffffff" }}>{t("No Current news")}</h2>
        </div>
      )}
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
        showThumbs={true}
        onChange={onChange}
        swipeable={true}
        useKeyboardArrows={true}
        dynamicHeight={true}
        stopOnHover={true}
        // onClickThumb={onClickThumb}
      >
        {newsItems.map((item) => (
          <div
            className="image-item-cont"
            key={item.uuid}
            style={{ backgroundImage: `url(${item.image_url})` }}
            onClick={() => onClickItem(item.url)}
          ></div>
        ))}
      </Carousel>

      {/* Display floating numbers */}
      <div className="floating-numbers">
        {floatingNumbers.map((number, index) => (
          <div
            key={index}
            className="floating-number"
            style={{
              animation: `float 2s ease-out ${index * 0.1}s`,
              left: number.left,
              top: number.top,
            }}
          >
            +{(0.00000257).toFixed(8)}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "0",
        }}
      >
        <img
          onClick={handleImageClick}
          src={bitcoin}
          className={isClicked ? "shaving" : ""}
          style={{
            width: "250px",
            cursor: "pointer",
            transform: isClicked ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
        <p
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
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={lightning}
            alt="Energy Icon"
            style={{ width: "30px", marginRight: "10px" }}
          />
          <p
            style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: "bold" }}
          >
            {energy} / 500
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
