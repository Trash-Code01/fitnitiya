/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from 'react';

const FitniyaSystem = () => {
  const mainContainerRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  // State to track the currently active card index
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const systemContent = {
    mainHeading: "The Fitniya System",
    subheading: "Our 30-Day Weight Gain Framework is a proven, step-by-step system designed to build healthy habits, sustainable strength, and lasting confidence.",
    steps: [
      {
        id: 1,
        step: "01",
        title: "Personalized Nutrition Blueprint",
        description: "No generic meal plans. We design a blueprint based on your body, metabolism, and food preferences.",
        position: "left"
      },
      {
        id: 2,
        step: "02",
        title: "Progressive Home Workouts",
        description: "Efficient, effective workouts you can do anywhere. We focus on progressive overload to build real strength.",
        position: "right"
      },
      {
        id: 3,
        step: "03",
        title: "1:1 Coaching & Accountability",
        description: "This is our secret sauce. You get direct access to us for guidance, motivation, and support.",
        position: "left"
      },
      {
        id: 4,
        step: "04",
        title: "Weekly Progress Check-Ins",
        description: "We analyze your progress every week and make adjustments to your plan to ensure you never get stuck.",
        position: "right"
      }
    ]
  };

  const { mainHeading, subheading, steps } = systemContent;

  // Memoized scroll handler to find the active card
  const handleScroll = useCallback(() => {
    const windowCenter = window.innerHeight / 2;
    let closestCardIndex = -1;
    let minDistance = Infinity;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2;
      const distance = Math.abs(cardCenter - windowCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestCardIndex = index;
      }
    });

    if (closestCardIndex !== activeCardIndex) {
      setActiveCardIndex(closestCardIndex);
    }
  }, [activeCardIndex]);

  // Effect to add and clean up the scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Effect to update the timeline and card styles when the active card changes
  useEffect(() => {
    if (!lineRef.current || !mainContainerRef.current) return;

    // Calculate the total height needed for the timeline
    const lastCard = cardsRef.current[cardsRef.current.length - 1];
    if (lastCard) {
      const containerTop = mainContainerRef.current.offsetTop;
      const lastCardTop = lastCard.offsetTop;
      const lastCardHeight = lastCard.offsetHeight;
      const totalHeight = lastCardTop + lastCardHeight / 2 + 150; // Extended beyond last card
      
      // Set the gray background line to full height
      const grayLine = lineRef.current.parentElement;
      if (grayLine) {
        grayLine.style.height = `${totalHeight}px`;
      }
      
      // Animate the pink line based on active card
      if (activeCardIndex !== null) {
        const activeCardEl = cardsRef.current[activeCardIndex];
        if (activeCardEl) {
          const height = activeCardEl.offsetTop + activeCardEl.offsetHeight / 2;
          lineRef.current.style.height = `${height}px`;
        }
      }
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const isActive = index === activeCardIndex;
      card.style.opacity = isActive ? '1' : '0.5';
      card.style.transform = isActive ? 'scale(1)' : 'scale(0.95)';
    });

  }, [activeCardIndex]);

  return (
    <section className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="text-center py-16 md:py-24 px-4">
        <h2 className="text-5xl md:text-7xl font-bold font-playfair text-black mb-4">
          {mainHeading}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-inter">
          {subheading}
        </p>
      </div>

      {/* Timeline Container */}
      <div ref={mainContainerRef} className="relative w-full py-16">
        {/* Central Line Container */}
        <div className="absolute left-8 md:left-1/2 top-0 w-1 bg-gray-200 md:-translate-x-1/2" style={{ height: '0px' }}>
          {/* The animated, colored line that grows on scroll */}
          <div
            ref={lineRef}
            className="w-full bg-pink-400 origin-top transition-all duration-500 ease-out"
            style={{ height: '0px' }}
          />
        </div>

        {/* Cards Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={el => cardsRef.current[index] = el}
              className={`relative flex items-center mb-24 md:mb-32 transition-all duration-500 ease-out ${
                step.position === 'right' ? 'md:justify-end' : 'md:justify-start'
              }`}
              style={{ marginTop: index === 0 ? '50px' : '0' }}
            >
              {/* Timeline Dot */}
              <div
                className="timeline-dot absolute w-5 h-5 md:w-6 md:h-6 bg-white rounded-full border-4 z-20 transition-all duration-300 left-[32px] md:left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  borderColor: index === activeCardIndex ? '#ec4899' : '#e5e7eb',
                  boxShadow: index === activeCardIndex 
                    ? '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)' 
                    : 'none'
                }}
              />

              {/* Card Content */}
              <div
                className={`w-full md:w-5/12 ml-[60px] md:ml-0 p-6 md:p-8 rounded-xl border-2`}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderColor: index === activeCardIndex ? '#ec4899' : '#e5e7eb',
                  boxShadow: index === activeCardIndex
                    ? '0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.3), 0 8px 32px rgba(0, 0, 0, 0.1)'
                    : '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3 
                  className={`text-xl md:text-2xl font-bold font-playfair mb-3 transition-colors duration-300`}
                  style={{ color: index === activeCardIndex ? '#ec4899' : '#1f2937' }}
                >
                  {step.title}
                </h3>
                
                <p className="text-gray-800 text-sm md:text-base leading-relaxed font-inter">
                  {step.description}
                </p>

                {/* Card Arrow - Points to the timeline */}
                <div
                  className={`absolute top-1/2 w-0 h-0 -translate-y-1/2 border-y-[10px] border-y-transparent
                    ${step.position === 'left'
                      ? 'hidden md:block right-0 translate-x-full border-l-[15px] border-l-white'
                      : 'hidden md:block left-0 -translate-x-full border-r-[15px] border-r-white'
                    }
                  `}
                />
                {/* Mobile Arrow - Always points left */}
                <div className="absolute top-1/2 left-0 -translate-x-full w-0 h-0 -translate-y-1/2 md:hidden border-r-[15px] border-r-white border-y-[10px] border-y-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom padding to ensure the last card can be centered */}
        <div className="h-96"></div>
      </div>
    </section>
  );
};

export default FitniyaSystem;