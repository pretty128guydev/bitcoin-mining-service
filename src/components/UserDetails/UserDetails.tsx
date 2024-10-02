import React from 'react';
import './UserDetails.css';
import { FaUserCircle } from 'react-icons/fa'; // Icon for the user avatar
import LocationCard from '../LocationCard/LocationCard';

const locations = [
    { id: 1, name: 'Location Name', description: 'ipsum dolo / ipsum dolo' },
    { id: 2, name: 'Location Name', description: 'ipsum dolo / ipsum dolo' },
    { id: 3, name: 'Location Name', description: 'ipsum dolo / ipsum dolo' },
    { id: 4, name: 'Location Name', description: 'ipsum dolo / ipsum dolo' },
];

const UserDetails: React.FC = () => {
    return (
        <div className="user-details-container">
            <div className="user-info">
                <button className="back-button">&larr;</button>
                <h2>User Details</h2>
                <div className="user-card">
                    <FaUserCircle size={80} color="#0077b6" /> {/* User Avatar */}
                    <div className="user-card-details">
                        <h3>User No.#</h3>
                        <p>
                            Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                            vulputate libero et velit interdum, ac aliquet odio mattis.
                        </p>
                    </div>
                </div>
            </div>

            <div className="locations-section">
                <div className="locations-list">
                    {locations.map((location) => (
                        <LocationCard key={location.id} name={location.name} description={location.description} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
