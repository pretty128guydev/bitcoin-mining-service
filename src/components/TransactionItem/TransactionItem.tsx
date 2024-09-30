import React from 'react';
import "./TransactionItem.css"

type TransactionItemProps = {
  title: string;
  amount: string;
  isNegative: boolean;
  date: string;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ title, amount, isNegative, date }) => {
  return (
    <div className="transaction-item">
      <div className="transaction-details">
        <div className="transaction-title">{title}</div>
        <div className="transaction-date">{date}</div>
      </div>
      <div className={`transaction-amount ${isNegative ? 'negative' : 'positive'}`}>
        {amount} USDT
      </div>
    </div>
  );
};

export default TransactionItem;
