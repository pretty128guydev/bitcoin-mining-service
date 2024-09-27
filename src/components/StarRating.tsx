import React from 'react';
import './StarRating.css';  // Optional for custom styles

interface StarRatingProps {
  rating: number;  // Rating value passed as a prop
  totalStars?: number;  // Total number of stars to show
  height: number;
  width: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars =  10, height, width}) => {
  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;

        return (
          <svg
            key={starValue}
            className="star"
            fill={starValue <= rating ? '#ffc107' : '#e4e5e9'}
            height={height}
            width={width}
            viewBox="0 0 25 25"
          >
            <polygon points="9.9,1.1 6.6,6.9 0.9,7.7 5.4,12.3 4.3,18.9 9.9,15.8 15.5,18.9 14.4,12.3 18.9,7.7 13.2,6.9" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;
