import React, { useState, useEffect, useMemo } from 'react';

const BeeAnimation = ({ frames, fps = 18, pingpong = true }) => {

  const smoothFrames = useMemo(() => {
    if (!pingpong) return frames;
    
    const forward = frames;
    const backward = frames.slice(1, -1).reverse();
    return [...forward, ...backward];
  }, [frames, pingpong]);

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % smoothFrames.length);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [smoothFrames, fps]);

  return (
    <div className="bee-space">
      <pre className="bee-ascii">{smoothFrames[currentFrame]}</pre>
    </div>
  );
};

export default BeeAnimation;