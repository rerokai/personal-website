import React, { useState, useEffect, useMemo } from 'react';

const BeeAnimation = ({ frames, fps = 18, pingpong = true }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [showText, setShowText] = useState(false); // Состояние для показа надписи bzzzz


  const smoothFrames = useMemo(() => {
    if (!pingpong || !frames || frames.length === 0) return frames;
    const forward = frames;
    const backward = frames.slice(1, -1).reverse();
    return [...forward, ...backward];
  }, [frames, pingpong]);


  useEffect(() => {
    if (!smoothFrames || smoothFrames.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % smoothFrames.length);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [smoothFrames, fps]);


  useEffect(() => {
    const textInterval = setInterval(() => {
      setShowText(true);


      setTimeout(() => {
        setShowText(false);
      }, 3000);

    }, 15000); 

    return () => {
      clearInterval(textInterval);
    };
  }, []);

  if (!smoothFrames || smoothFrames.length === 0) return null;

  return (
    <div className="bee-space" style={{ position: 'relative', display: 'inline-block' }}>
      
      <div 
        style={{
          position: 'absolute',
          top: '295px', 
          left: '90%',
          transform: 'translateX(-50%)',
          fontFamily: '"Micro 5"', 
          fontSize: '24px',
          color: 'black', 
          opacity: showText ? 0.7 : 0,
          transition: 'opacity 0.3s ease', 
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        bzzzzzz
      </div>


      <pre 
        className="bee-ascii" 
        style={{ 
          margin: 0, 
          fontFamily: 'monospace', 
          whiteSpace: 'pre',
          lineHeight: '1.1' 
        }}
      >
        {smoothFrames[currentFrame]}
      </pre>
    </div>
  );
};

export default BeeAnimation;
