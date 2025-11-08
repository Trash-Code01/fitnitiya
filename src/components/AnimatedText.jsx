/* eslint-disable no-unused-vars */
// src/components/AnimatedText.jsx

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable component that animates text word-by-word,
 * highlighting from a 'dimmed' state to a 'visible' state.
 * Animation triggers when the component scrolls into view.
 */
const AnimatedText = ({
  text,
  el: Wrapper = 'p', // The HTML tag to use (e.g., 'h1', 'p')
  className,
  dimmedColor = 'text-gray-400', // Tailwind class for dimmed text
  visibleColor = 'text-black',  // Tailwind class for visible text
  stagger = 200, // Time in ms between each word
}) => {
  const words = text.split(' ');
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef(null);

  // Effect to set up the Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 } // Triggers when 50% is visible
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Effect to control the word-by-word animation
  useEffect(() => {
    let interval;

    if (isIntersecting && activeWordIndex < words.length - 1) {
      // If in view, start the animation
      interval = setInterval(() => {
        setActiveWordIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= words.length) {
            clearInterval(interval); // Stop interval when done
            return prevIndex;
          }
          return nextIndex;
        });
      }, stagger);
    } else if (!isIntersecting) {
      // If not in view, reset the animation
      setActiveWordIndex(-1);
    }

    return () => clearInterval(interval);
  }, [isIntersecting, words.length, stagger, activeWordIndex]);

  return (
    <Wrapper ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`transition-colors duration-500 ease-in-out ${
            index <= activeWordIndex ? visibleColor : dimmedColor
          }`}
        >
          {word}{' '}
        </span>
      ))}
    </Wrapper>
  );
};

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  el: PropTypes.string,
  className: PropTypes.string,
  dimmedColor: PropTypes.string,
  visibleColor: PropTypes.string,
  stagger: PropTypes.number,
};

export default AnimatedText;