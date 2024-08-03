"use client";
import { AnimatePresence } from "framer-motion";
import Flash from "./Flash";
import { useState, useEffect } from "react";
`
`;

interface TimerProps {
  initialTime: number;
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [countupTime, setCountupTime] = useState(0);
  const [isflashing, setFlash] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (countdownTime > 0) {
      timerId = setTimeout(() => setCountdownTime(countdownTime - 1), 1000);
      setFlash(false);
    } else if (countdownTime <= 0) {
      setFlash(true);
      timerId = setTimeout(() => setCountdownTime(initialTime), 1000);
    }

    return () => clearTimeout(timerId);
  }, [countdownTime, initialTime]);

  // Countup timer effect
  useEffect(() => {
    const intervalId = setInterval(() => setCountupTime((prev) => prev + 1), 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-white">
      
      <h1>Time until flashed</h1>
      <p>{formatTime(countdownTime)}</p>
      <h1>Time taken</h1>
      <p>{formatTime(countupTime)}</p>
    </div>
  );
};

export default Timer;
