import React from 'react';

const ScrollProgress = ({ scrollProgress }) => {
  const progressBarWidth = `${scrollProgress * 100}%`;

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300"
      style={{ width: progressBarWidth }}
    />
  );
};

export default ScrollProgress;