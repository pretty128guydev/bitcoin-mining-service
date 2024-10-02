import React, { useState } from 'react';
import './UsersList.css';
import UserCard from '../UserCard/UserCard';

const users = [
    { id: 1, name: 'User 1', description: 'Jorem ipsum dolor, consectetur.' },
    { id: 2, name: 'User 2', description: 'Jorem ipsum dolor, consectetur.' },
    { id: 3, name: 'User 3', description: 'Jorem ipsum dolor, consectetur.' },
    { id: 4, name: 'User 4', description: 'Jorem ipsum dolor, consectetur.' },
    { id: 5, name: 'User 5', description: 'Jorem ipsum dolor, consectetur.' },
    { id: 6, name: 'User 6', description: 'Jorem ipsum dolor, consectetur.' },
    { id: 7, name: 'User 7', description: 'Jorem ipsum dolor, consectetur.' },
];

const ITEMS_PER_PAGE = 3; // Number of users per page

const UsersList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    // Calculate the users to display based on the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Handler for changing the page
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="users-list-container">
            <div className="users-list">
                <h2>Users List</h2>
                {selectedUsers.map(user => (
                    <UserCard key={user.id} name={user.name} description={user.description} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Display Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersList;
