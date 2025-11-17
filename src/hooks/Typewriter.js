// src/hooks/useTypewriter.js

import { useState, useEffect } from 'react';

/**
 * A custom hook for a typewriter effect.
 * @param {string} text - The full text to be typed.
 * @param {number} [speed=50] - The typing speed in milliseconds.
 */
const useTypewriter = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset when text changes
    let i = 0;
    
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [text, speed]); // Re-run effect if text or speed changes

  return displayedText;
};

export default useTypewriter;