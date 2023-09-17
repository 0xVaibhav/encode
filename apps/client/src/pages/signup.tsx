import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
function TimerButton() {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(24*60*60); // 24 hours in seconds
  const [clickCount, setClickCount] = useState(0);

  const startTimer = () => {
    setIsActive(true);
    setTimeRemaining(24*60*60); // Reset the timer to 24 hours when clicked
    setClickCount(clickCount + 1);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  useEffect(() => {
    // Reset the counter to 0 after 48 hours
    const timer = setTimeout(() => {
      setClickCount(0);
    },48 * 60* 60* 1000); // 48 hours in milliseconds

    return () => clearTimeout(timer);
  }, [clickCount]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const pad = (value: number) => (value < 10 ? `0${value}` : value);

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  return (
    <div>
        
      <button onClick={startTimer} disabled={isActive}>
        {isActive ? 'Timer Running' : 'Start 24-Hour Timer'}
      </button>
      {isActive && (
        <div>
          <p>Time Remaining: {formatTime(timeRemaining)}</p>
        </div>
      )}
      <p>Click Count: {clickCount}</p>

      <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>
    </div>
    
  );
}

export default TimerButton;
