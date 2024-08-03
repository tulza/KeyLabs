import { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number;
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [countupTime, setCountupTime] = useState(0);

  useEffect(() => {
    if (countdownTime > 0) {
      const timerId = setTimeout(() => setCountdownTime(countdownTime - 1), 1000);
      return () => clearTimeout(timerId);
    } 
    else {
      setInterval(() => setCountupTime((prevTime) => prevTime + 1), 1000);
    }
  }, [countdownTime, initialTime]);


  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
        <div className='text-white'>
      <h1>Time taken</h1>
      <p>{formatTime(countupTime)}</p>
    </div>
    <div className='countdownTime'>
      <p>{countdownTime}</p>
    </div>
    </>


  );
};

export default Timer;