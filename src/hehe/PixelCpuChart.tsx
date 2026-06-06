import React, { useEffect, useRef, useState } from 'react';

interface CpuFrame {
  time: string;
  layer1: number;
  layer2: number;
  layer3: number;
  layer4: number;
}

const getInitialData = (): CpuFrame[] => {
  const data: CpuFrame[] = [];
  const now = new Date();
  now.setMinutes(Math.floor(now.getMinutes() / 10) * 10);
  now.setSeconds(0);

  for (let i = 6; i >= 0; i--) {
    const pastTime = new Date(now.getTime() - i * 10 * 60 * 1000);
    const timeStr = `${String(pastTime.getHours()).padStart(2, '0')}:${String(pastTime.getMinutes()).padStart(2, '0')}`;
    

    const base = Math.floor(Math.random() * 8) + 12; 
    data.push({
      time: timeStr,
      layer1: Math.round(base * 0.25),
      layer2: Math.round(base * 0.50),
      layer3: Math.round(base * 0.75),
      layer4: base
    });
  }
  return data;
};

const generateLiveValues = (timeStr: string): CpuFrame => {
  const base = Math.floor(Math.random() * 8) + 12;
  return {
    time: timeStr,
    layer1: Math.round(base * 0.25),
    layer2: Math.round(base * 0.50),
    layer3: Math.round(base * 0.75),
    layer4: base
  };
};

const PixelCpuChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<CpuFrame[]>(getInitialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const lastTimeParts = prevData[prevData.length - 1].time.split(':');
        const nextTime = new Date();
        nextTime.setHours(parseInt(lastTimeParts[0]), parseInt(lastTimeParts[1]) + 10, 0);
        
        const timeStr = `${String(nextTime.getHours()).padStart(2, '0')}:${String(nextTime.getMinutes()).padStart(2, '0')}`;
        return [...prevData.slice(1), generateLiveValues(timeStr)];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const colors = {
    bg: '#ffffff',
    layer4: '#4d7fff', 
    layer3: '#709cff',
    layer2: '#94b8ff',
    layer1: '#d6e4ff',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.imageSmoothingEnabled = false;

    const pixelSize = 6; 
    const gridWidth = 65;   
    const gridHeight = 35;  

    canvas.width = gridWidth * pixelSize;   // 486px
    canvas.height = gridHeight * pixelSize; // 186px

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const columnsPerPoint = Math.floor(gridWidth / chartData.length);

    for (let x = 0; x < gridWidth; x++) {
      const dataIndex = Math.min(Math.floor(x / columnsPerPoint), chartData.length - 1);
      const currentPoint = chartData[dataIndex];
      const nextPoint = chartData[dataIndex + 1] || currentPoint;

      const subProgress = (x % columnsPerPoint) / columnsPerPoint;
      
      const h1 = currentPoint.layer1 + (nextPoint.layer1 - currentPoint.layer1) * subProgress;
      const h2 = currentPoint.layer2 + (nextPoint.layer2 - currentPoint.layer2) * subProgress;
      const h3 = currentPoint.layer3 + (nextPoint.layer3 - currentPoint.layer3) * subProgress;
      const h4 = currentPoint.layer4 + (nextPoint.layer4 - currentPoint.layer4) * subProgress;

      for (let y = 0; y < gridHeight; y++) {
        const invY = gridHeight - 1 - y; 
        const noise = Math.random() * 1.6 - 0.8; 
        const testY = y + noise;

        if (testY < h1) {
          ctx.fillStyle = colors.layer1;
        } else if (testY < h2) {
          ctx.fillStyle = colors.layer2;
        } else if (testY < h3) {
          ctx.fillStyle = colors.layer3;
        } else if (testY < h4) {
          ctx.fillStyle = colors.layer4;
        } else {
          continue; 
        }

        ctx.fillRect(x * pixelSize, invY * pixelSize, pixelSize, pixelSize);
        ctx.strokeStyle = colors.bg;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x * pixelSize, invY * pixelSize, pixelSize, pixelSize);
      }
    }
  }, [chartData]);

  const xStepDistance = 486 / (chartData.length - 1);

  return (
  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff' }}>
    

    <div style={{ 
      position: 'relative', 
      display: 'inline-block',
      padding: '45px 40px 55px 85px', 
      width: '611px',  
      height: '286px'  
    }}>
      

      <svg 
        viewBox="0 0 611 286" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '611px',
          height: '286px',
          pointerEvents: 'none'
        }}
      >
        {/* Декоративная рамка */}
        <g stroke="rgb(0, 132, 255)" strokeWidth="1.5" fill="none">
          <path d="M 0,15 L 0,0 L 225,0" />
          <path d="M 385,0 L 611,0 L 611,15" />
          <path d="M 0,271 L 0,286 L 20,286" />
          <path d="M 591,286 L 611,286 L 611,271" />
        </g>

        {/* ОСЬ Y */}
        <line x1="75" y1="45" x2="75" y2="231" stroke="#ccc" strokeWidth="1" />
        {[100, 75, 50, 25, 0].map((val, idx) => {
          const yCoord = 45 + idx * (186 / 4);
          return (
            <g key={val}>
              <line x1="71" y1={yCoord} x2="75" y2={yCoord} stroke="#ccc" strokeWidth="1" />
              <text x="62" y={yCoord + 5} textAnchor="end" style={{ fontFamily: '"Jersey 10", monospace', fontSize: '18px', fill: '#888', userSelect: 'none' }}>
                {val}%
              </text>
            </g>
          );
        })}

        {/* ОСЬ X */}
        <line x1="85" y1="237" x2="571" y2="237" stroke="#ccc" strokeWidth="1" />
        {chartData.map((point, idx) => {
          const xCoord = 85 + idx * xStepDistance;
          return (
            <g key={idx}>
              <line x1={xCoord} y1="237" x2={xCoord} y2="241" stroke="#ccc" strokeWidth="1" />
              <text 
                x={xCoord} 
                y="258" 
                textAnchor="middle" 
                style={{ 
                  fontFamily: '"Jersey 10", monospace', 
                  fontSize: '18px', 
                  fill: '#888',
                  userSelect: 'none'
                }}
              >
                {point.time}
              </text>
            </g>
          );
        })}
      </svg>


      <div style={{ 
        position: 'absolute',
        top: '-15px', 
 
        left: 'calc((611px - 150px) / 2)', 
        width: '150px', 
        fontFamily: '"Jersey 10", monospace', 
        fontSize: '32px', 
        color: 'rgb(0, 132, 255)', 
        backgroundColor: '#fff', 
        textAlign: 'center',
        letterSpacing: '2px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        zIndex: 10
      }}>
        CPU {chartData[chartData.length - 1] ? Math.round(chartData[chartData.length - 1].layer4 * 3.2) : 0}%
      </div>
      

      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block',
          imageRendering: 'pixelated',
          width: '486px',
          height: '186px'
        }}
      />

    </div>
  </div>
);

};

export default PixelCpuChart;
