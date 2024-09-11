import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewsSection.css";
import useWindowSize from "../hooks/useWindowSize";
import bitcoin from "../assets/bitcoin.png";
import { Flex } from "antd";
import nonews from "../assets/nonews.svg";
import Loader from "../assets/Loader";

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
  const width = useWindowSize() ?? 0;

  // State to track if the image is clicked or not
  const [isClicked, setIsClicked] = useState(false);

  // Function to handle image click
  const handleImageClick = () => {
    setIsClicked((prev) => !prev); // Toggle the clicked state
    setPrice(price + 0.00000257);
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

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
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
          <h2 style={{ color: "#ffffff" }}>No Current news</h2>
        </div>
      )}
      <div className="image-gallery">
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          onClick={handleImageClick} // Add click event
          src={bitcoin}
          style={{
            width: width < 500 ? 160 : 210,
            marginBottom: "20px",
            cursor: "pointer", // Cursor change to indicate clickability
            transform: isClicked ? "scale(1.1)" : "scale(1)", // Effect: scale image when clicked
            transition: "transform 0.3s ease", // Smooth transition effect
          }}
        />
        <p
          style={{
            fontSize: "2rem", // Large font for visibility
            fontWeight: "bold", // Bold for emphasis
            color: "#ffffff", // Bright color for prominence
            background: "linear-gradient(135deg, #001529, #0072ff)", // Gradient for dynamic look
            padding: "10px 20px", // Padding around the text
            borderRadius: "15px", // Rounded corners for modern look
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
            transition: "transform 0.3s ease-in-out", // Smooth animation for subtle hover effect
            transform: isClicked ? "scale(1.1)" : "scale(1)", // Slight scale on click
          }}
        >
          ${price.toFixed(8)} {/* Format price with fixed decimal points */}
        </p>
      </div>
    </div>
  );
};

export default NewsSection;
