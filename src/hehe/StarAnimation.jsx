import React, { useState, useEffect, useMemo, useRef } from 'react';

const StarAnimation = ({ frames, fps = 24, pingpong = false }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  
  const isHoveredRef = useRef(isHovered);
  const isAutoPlayingRef = useRef(isAutoPlaying);

  useEffect(() => {
    isHoveredRef.current = isHovered;
    if (isHovered) {
      setIsAutoPlaying(false);
      isAutoPlayingRef.current = false;
    }
  }, [isHovered]);

  useEffect(() => {
    isAutoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  const normalizedFrames = useMemo(() => {
    return frames.map(frame => {
      const lines = frame.split('\n');
      
      const cleanedLines = lines.filter((line, index) => {
        if (index === 0 && line.trim() === '') return false;
        if (index === lines.length - 1 && line.trim() === '') return false;
        return true;
      });

      const maxLength = Math.max(...cleanedLines.map(l => l.length), 0);

      return cleanedLines
        .map(line => line.padEnd(maxLength, ' '))
        .join('\n');
    });
  }, [frames]);

  const smoothFrames = useMemo(() => {
    if (!pingpong || normalizedFrames.length <= 2) return normalizedFrames;
    const forward = normalizedFrames;
    const backward = normalizedFrames.slice(1, -1).reverse();
    return [...forward, ...backward];
  }, [normalizedFrames, pingpong]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {

        if (!isHoveredRef.current && !isAutoPlayingRef.current && prev === 0) {
          return 0;
        }

        const next = (prev + 1) % smoothFrames.length;
        
        if (isAutoPlayingRef.current && next === 0) {
          setIsAutoPlaying(false);
          return 0;
        }

        if (!isHoveredRef.current && !isAutoPlayingRef.current && next === 0) {
          return 0;
        }

        return next;
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [smoothFrames, fps]);

  useEffect(() => {
    const autoPlayTimer = setInterval(() => {

      if (!isHoveredRef.current) {
        setIsAutoPlaying(true);
      }
    }, 10000); // 10 секунд

    return () => clearInterval(autoPlayTimer);
  }, []);

  if (!smoothFrames.length) return null;

  return (
    <div 
      className="star-space" 
      style={{ 
        display: 'inline-block', 
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <pre 
        className="star-ascii" 
        style={{ 
          fontFamily: 'monospace', 
          whiteSpace: 'pre',
          lineHeight: '1.0', 
          userSelect: 'none',
        }}
      >
        {smoothFrames[currentFrame]}
      </pre>
    </div>
  );
};

export default StarAnimation;
