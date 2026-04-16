import React from 'react';

type Props = {
  scrollProgress: number;
};

const ScrollProgress = ({ scrollProgress }: Props) => {
  const progressBarWidth = `${scrollProgress * 100}%`;

  return (
    <div style={{ width: progressBarWidth }} />
  );
};

export default ScrollProgress;