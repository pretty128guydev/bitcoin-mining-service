import React from 'react';
import './Record.css';

const Record: React.FC = () => {
  return (
    <div className="record-container">
      <h1>Your Transaction Records</h1>
      <ul className="record-list">
        <li>Transaction 1: $200 - Completed</li>
        <li>Transaction 2: $500 - Pending</li>
        <li>Transaction 3: $100 - Failed</li>
      </ul>
    </div>
  );
};

export default Record;
