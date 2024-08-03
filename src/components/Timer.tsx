"use client";

import { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number;
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [countupTime, setCountupTime] = useState(1);

  // Countdown timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    
    if (countdownTime > 0) {
      timerId = setTimeout(() => setCountdownTime(countdownTime - 1), 1000);
    } 
    // else if (countdownTime <= 0) {
    //   timerId = setTimeout(() => setCountdownTime(initialTime), 1000);
    // }

    return () => clearTimeout(timerId);
  }, [countdownTime, initialTime]);

  // Countup timer effect
  useEffect(() => {
    const intervalId = setInterval(() => setCountupTime(prev => prev + 1), 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='text-white'>
      <h1 className='text-9xl'>{countdownTime}</h1>

    </div>
  );
};

export default Timer;
