import React, { useState } from 'react';

export function OneTimeButton() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [clickCount, setClickCount] = useState<number>(0);

  // Function to handle the button click
  const handleClick = () => {
    if (isActive) {
      // Perform your action here

      // Update the click count
      setClickCount(clickCount + 1);

      // Disable the button
      setIsActive(false);

      // Set a timer to enable the button after 24 hours
      setTimeout(() => {
        setIsActive(true);
      }, 24 * 60 * 60 * 1000); // 24 hours
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={!isActive}
      >
        {isActive ? 'Click Me' : 'Button Deactivated'}
      </button>
      <p>Click Count: {clickCount}</p>
    </div>
  );
}
