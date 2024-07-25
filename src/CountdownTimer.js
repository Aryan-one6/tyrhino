import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Import custom CSS for underline effect

const CountdownTimer = () => {
  const getInitialTimeLeft = () => {
    const targetTime = localStorage.getItem('targetTime');
    if (targetTime) {
      const difference = new Date(targetTime) - new Date();
      return difference > 0 ? difference : 1 * 60 * 1000; // 1 minute in milliseconds
    }
    return 1 * 60 * 1000; // 1 minute in milliseconds
  };

  const calculateTimeLeft = (time) => {
    let timeLeft = {};
    if (time > 0) {
      timeLeft = {
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60),
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(getInitialTimeLeft()));
  const [timeRemaining, setTimeRemaining] = useState(getInitialTimeLeft());

  useEffect(() => {
    const targetTime = new Date().getTime() + timeRemaining;
    localStorage.setItem('targetTime', targetTime);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      setTimeRemaining(difference);
      setTimeLeft(calculateTimeLeft(difference));

      if (difference <= 0) {
        clearInterval(timer);
        setTimeRemaining(1 * 60 * 1000); // Reset to 1 minute
        setTimeLeft(calculateTimeLeft(1 * 60 * 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  return (
    <div className="flex items-center  justify-center h-screen ">
      <div className="bg-[#FFFFFF] p-6 w-full max-w-6xl">
        <div className="callout p-6 bg-[#f4f4f4] shadow-md rounded-lg">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xl md:text-xl md:justify-between items-center">⏰</span> {/* Timer Emoji */}
              <h1 className="text-xl md:text-xl font-bold mb-4 md:mb-0 relative text-center md:text-left underline-mobile">
                Limited Time Offer
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-between mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-s md:text-l mr-2">Ends in</span>
                <div className="flex space-x-2 text-xl md:text-xl font-mono">
                
                  <div className="flex flex-col items-center">
                    <span className="font-bold">:{timeLeft.hours}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold">:{timeLeft.minutes}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold">:{timeLeft.seconds}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="bg-blue-400 text-white px-4 py-2 rounded-md">
                <p className="hidden md:flex items-center">
                  Get 10% Off! &nbsp; Use Code: <span className="font-bold">EXAMSTART</span>
                </p>
                <p className="block md:hidden">
                  Get 10% Off! &nbsp; Use Code: <span className="font-bold">EXAMSTART</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
