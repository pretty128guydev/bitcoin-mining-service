import React from 'react';
import { FaUserCircle, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import './UserCard.css';

interface UserCardProps {
    name: string;
    description: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, description }) => {
    return (
        <div className="user-card">
            <div className="user-icon">
                <FaUserCircle size={40} color="#0077b6" /> {/* User icon */}
            </div>
            <div className="user-details">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default UserCard;
