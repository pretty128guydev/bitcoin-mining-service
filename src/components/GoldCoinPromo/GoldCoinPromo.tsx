// GoldCoinPromo.tsx
import React from 'react';
import './GoldCoinPromo.css';
import gold_coin from "../../assets/gold_coin.png"

const GoldCoinPromo: React.FC = () => {
  return (
    <div className="promo-container">
      <h1 className="promo-title">GOLDEN COIN</h1>
      <h2 className="promo-subtitle">Earn a Gold Coin and Win a Trip!</h2>
      <p className="promo-text">
        Invite your friends to join our service, and for every 50 successful referrals, you'll earn 1 Gold Coin. 
        Each Gold Coin can be exchanged for an exciting travel opportunity to destinations like Dubai, Turkey, 
        Thailand, and many more!
      </p>
      <div className="coin-container">
        <img src={gold_coin} alt="Gold Coin" className="gold-coin-image" />
      </div>
    </div>
  );
};

export default GoldCoinPromo;
