import React, { useState, useEffect } from "react";

interface TimerProps {
  buyAt: Date;
}

const Timer: React.FC<TimerProps> = ({ buyAt }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [remainingDays, setRemainingDays] = useState<number>(60);

  // Calculate remaining time for the current 24-hour cycle
  const calculateRemainingTime = () => {
    const currentTime = new Date();
    const timePassed = currentTime.getTime() - buyAt.getTime();
    const remainingTime = 24 * 60 * 60 * 1000 - (timePassed % (24 * 60 * 60 * 1000));
    setRemainingTime(remainingTime);
  };

  // Calculate remaining days out of 60 days
  const calculateRemainingDays = () => {
    const currentTime = new Date();
    const daysPassed = Math.floor((currentTime.getTime() - buyAt.getTime()) / (24 * 60 * 60 * 1000));
    const daysLeft = 60 - daysPassed;
    setRemainingDays(daysLeft > 0 ? daysLeft : 0);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      calculateRemainingTime();
      calculateRemainingDays();
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Clear timer on component unmount
  }, [buyAt]);

  // Convert remaining milliseconds to hours, minutes, and seconds
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  return (
    <div>
      <h2>Remaining Time Today: {`${hours}h ${minutes}m ${seconds}s`}</h2>
      <h3>Remaining Days: {remainingDays}</h3>
    </div>
  );
};

export default Timer;
