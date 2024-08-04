"use client";
import { AnimatePresence } from "framer-motion";
import Flash from "./Flash";
import { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [countupTime, setCountupTime] = useState(0);
  const [isflashing, setFlash] = useState(false);
  const [hasGameStart, setGameStart] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (countdownTime > 0) {
      if (!hasGameStart) return;
      timerId = setTimeout(() => setCountdownTime(countdownTime - 1), 1000);
      setFlash(false);
    } else if (countdownTime <= 0) {
      setFlash(true);
      timerId = setTimeout(() => setCountdownTime(initialTime), 1000);
    }

    return () => clearTimeout(timerId);
  }, [countdownTime, initialTime]);


  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white *:rounded-xl">
      <h1 className="w-min whitespace-nowrap bg-black p-2 px-8">
        Time taken <span>{formatTime(countupTime)}</span>
      </h1>
    </div>
  );
};

export default Timer;
