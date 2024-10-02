import React from 'react';
import './LocationCard.css';

interface LocationCardProps {
    name: string;
    description: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ name, description }) => {
    return (
        <div className="location-card">
            <div className="location-details">
                <h4>{name}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default LocationCard;
