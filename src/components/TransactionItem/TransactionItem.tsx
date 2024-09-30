import React from 'react';
import "./TransactionItem.css"

type TransactionItemProps = {
  title: string;
  amount: number;
  date: string;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ title, amount, date }) => {
  const newdate = new Date(date).toLocaleString("en-US");
  return (
    <div className="transaction-item">
      <div className="transaction-details">
        <div className="transaction-title">{title}</div>
        <div className="transaction-date">{newdate}</div>
      </div>
      <div className={`transaction-amount ${amount < 0 ? 'negative' : 'positive'}`}>
        {amount} USDT
      </div>
    </div>
  );
};

export default TransactionItem;
