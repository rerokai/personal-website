import React, { useEffect, useRef, useState } from 'react';

interface RamFrame {
  time: string;
  value1: number;
  value2: number;
}

const initialRamData: RamFrame[] = [
  { time: '01.06', value1: 80, value2: 70 },
  { time: '02.06', value1: 83, value2: 65 },
  { time: '03.06', value1: 72, value2: 38 },
  { time: '04.06', value1: 80, value2: 65 },
  { time: '05.06', value1: 73, value2: 38 },
  { time: '06.06', value1: 80, value2: 65 },
  { time: '07.06', value1: 83, value2: 77 },
];

const PixelRamChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<RamFrame[]>(initialRamData);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const lastTimeParts = prevData[prevData.length - 1].time.split(':');
        const nextTime = new Date();
        nextTime.setMinutes(nextTime.getMinutes() + 10);
        const timeStr = `${String(nextTime.getHours()).padStart(2, '0')}:${String(nextTime.getMinutes()).padStart(2, '0')}`;
        const newValue1 = Math.floor(Math.random() * 40) + 45;
        const newValue2 = Math.floor(Math.random() * 30) + 35;
        return [...prevData.slice(1), { time: timeStr, value1: newValue1, value2: newValue2 }];
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 344;
    canvas.height = 186;
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = 20;
    const gapBetweenBars = 6;
    const gapBetweenDays = 12;
    const startX = 10; 

    chartData.forEach((point, idx) => {
      const x = startX + idx * (barWidth * 2 + gapBetweenBars + gapBetweenDays);
      const h1 = (point.value1 / 100) * canvas.height;
      const h2 = (point.value2 / 100) * canvas.height;


      ctx.fillStyle = '#c8c8c8';
      ctx.fillRect(x, canvas.height - h1, barWidth, h1);

      ctx.fillStyle = '#555555';
      ctx.fillRect(x + barWidth + gapBetweenBars, canvas.height - h2, barWidth, h2);
    });
  }, [chartData]);

  const currentRamPercent = chartData[chartData.length - 1] ? Math.round(chartData[chartData.length - 1].value2) : 65;

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
          style={{ position: 'absolute', top: 0, left: 0, width: '611px', height: '286px', pointerEvents: 'none' }}
        >
          <g stroke="rgb(0, 132, 255)" strokeWidth="1" fill="none">
            <path d="M 0,15 L 0,0 L 225,0" />
            <path d="M 385,0 L 611,0 L 611,15" />
            <path d="M 0,271 L 0,286 L 20,286" />
            <path d="M 591,286 L 611,286 L 611,271" />
          </g>
          {/* Ось Y */}
          <line x1="75" y1="45" x2="75" y2="231" stroke="#ccc" strokeWidth="1" />
          {[100, 80, 60, 40, 20, 0].map((val, idx) => {
            const yCoord = 45 + idx * (186 / 5);
            return (
              <g key={val}>
                <line x1="71" y1={yCoord} x2="75" y2={yCoord} stroke="#ccc" strokeWidth="1" />
                <text x="62" y={yCoord + 5} textAnchor="end" style={{ fontFamily: '"Jersey 10", monospace', fontSize: '18px', fill: '#888', userSelect: 'none' }}>
                  {val}
                </text>
              </g>
            );
          })}

          <line x1="85" y1="237" x2="429" y2="237" stroke="#ccc" strokeWidth="1" />
          {chartData.map((point, idx) => {
            const xCoord = 85 + idx * (344 / (chartData.length - 1));
            return (
              <g key={idx}>
                <line x1={xCoord} y1="237" x2={xCoord} y2="241" stroke="#ccc" strokeWidth="1" />
                <text x={xCoord} y="258" textAnchor="middle" style={{ fontFamily: '"Jersey 10", monospace', fontSize: '18px', fill: '#888', userSelect: 'none' }}>
                  {point.time}
                </text>
              </g>
            );
          })}
        </svg>


        <div style={{
          position: 'absolute', top: '-15px', left: 'calc((611px - 150px) / 2)', width: '150px',
          fontFamily: '"Jersey 10", monospace', fontSize: '32px', color: 'rgb(0, 132, 255)',
          backgroundColor: '#fff', textAlign: 'center', letterSpacing: '2px', zIndex: 10, userSelect: 'none'
        }}>
          RAM
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', width: '486px' }}>

          <canvas ref={canvasRef} style={{ display: 'block', imageRendering: 'pixelated', width: '344px', height: '186px' }} />
          

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontFamily: '"Jersey 10", monospace', fontSize: '36px', color: 'rgb(0, 132, 255)', marginBottom: '10px', userSelect: 'none' }}>
              {currentRamPercent}%
            </div>
            <svg width="112" height="112" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
              <defs>
                <mask id="furnace-mask">
                  <rect x="0" y="0" width="16" height="16" fill="black" />
                  <g fill="white">

                    {[...Array(16)].map((_, row) =>
                      [...Array(16)].map((_, col) => {

                      })
                    )}
                    
                    <rect x="0" y="0" width="1" height="1" /><rect x="1" y="0" width="1" height="1" /><rect x="2" y="0" width="1" height="1" /><rect x="3" y="0" width="1" height="1" /><rect x="4" y="0" width="1" height="1" /><rect x="5" y="0" width="1" height="1" /><rect x="6" y="0" width="1" height="1" /><rect x="7" y="0" width="1" height="1" /><rect x="8" y="0" width="1" height="1" /><rect x="9" y="0" width="1" height="1" /><rect x="10" y="0" width="1" height="1" /><rect x="11" y="0" width="1" height="1" /><rect x="12" y="0" width="1" height="1" /><rect x="13" y="0" width="1" height="1" /><rect x="14" y="0" width="1" height="1" /><rect x="15" y="0" width="1" height="1" />
                    <rect x="0" y="1" width="1" height="1" /><rect x="1" y="1" width="1" height="1" /><rect x="2" y="1" width="1" height="1" /><rect x="3" y="1" width="1" height="1" /><rect x="4" y="1" width="1" height="1" /><rect x="5" y="1" width="1" height="1" /><rect x="6" y="1" width="1" height="1" /><rect x="7" y="1" width="1" height="1" /><rect x="8" y="1" width="1" height="1" /><rect x="9" y="1" width="1" height="1" /><rect x="10" y="1" width="1" height="1" /><rect x="11" y="1" width="1" height="1" /><rect x="12" y="1" width="1" height="1" /><rect x="13" y="1" width="1" height="1" /><rect x="14" y="1" width="1" height="1" /><rect x="15" y="1" width="1" height="1" />
                    <rect x="0" y="2" width="1" height="1" /><rect x="1" y="2" width="1" height="1" /><rect x="14" y="2" width="1" height="1" /><rect x="15" y="2" width="1" height="1" />
                    <rect x="0" y="3" width="1" height="1" /><rect x="1" y="3" width="1" height="1" /><rect x="14" y="3" width="1" height="1" /><rect x="15" y="3" width="1" height="1" />
                    <rect x="0" y="4" width="1" height="1" /><rect x="1" y="4" width="1" height="1" /><rect x="6" y="4" width="1" height="1" /><rect x="7" y="4" width="1" height="1" /><rect x="8" y="4" width="1" height="1" /><rect x="9" y="4" width="1" height="1" /><rect x="14" y="4" width="1" height="1" /><rect x="15" y="4" width="1" height="1" />
                    <rect x="0" y="5" width="1" height="1" /><rect x="1" y="5" width="1" height="1" /><rect x="6" y="5" width="1" height="1" /><rect x="7" y="5" width="1" height="1" /><rect x="8" y="5" width="1" height="1" /><rect x="9" y="5" width="1" height="1" /><rect x="14" y="5" width="1" height="1" /><rect x="15" y="5" width="1" height="1" />
                    <rect x="0" y="6" width="1" height="1" /><rect x="1" y="6" width="1" height="1" /><rect x="14" y="6" width="1" height="1" /><rect x="15" y="6" width="1" height="1" />
                    <rect x="0" y="7" width="1" height="1" /><rect x="1" y="7" width="1" height="1" /><rect x="14" y="7" width="1" height="1" /><rect x="15" y="7" width="1" height="1" />
                    <rect x="0" y="8" width="1" height="1" /><rect x="1" y="8" width="1" height="1" /><rect x="2" y="8" width="1" height="1" /><rect x="3" y="8" width="1" height="1" /><rect x="4" y="8" width="1" height="1" /><rect x="5" y="8" width="1" height="1" /><rect x="6" y="8" width="1" height="1" /><rect x="7" y="8" width="1" height="1" /><rect x="8" y="8" width="1" height="1" /><rect x="9" y="8" width="1" height="1" /><rect x="10" y="8" width="1" height="1" /><rect x="11" y="8" width="1" height="1" /><rect x="12" y="8" width="1" height="1" /><rect x="13" y="8" width="1" height="1" /><rect x="14" y="8" width="1" height="1" /><rect x="15" y="8" width="1" height="1" />
                    <rect x="0" y="9" width="1" height="1" /><rect x="1" y="9" width="1" height="1" /><rect x="2" y="9" width="1" height="1" /><rect x="3" y="9" width="1" height="1" /><rect x="4" y="9" width="1" height="1" /><rect x="11" y="9" width="1" height="1" /><rect x="12" y="9" width="1" height="1" /><rect x="13" y="9" width="1" height="1" /><rect x="14" y="9" width="1" height="1" /><rect x="15" y="9" width="1" height="1" />
                    <rect x="0" y="10" width="1" height="1" /><rect x="1" y="10" width="1" height="1" /><rect x="2" y="10" width="1" height="1" /><rect x="3" y="10" width="1" height="1" /><rect x="12" y="10" width="1" height="1" /><rect x="13" y="10" width="1" height="1" /><rect x="14" y="10" width="1" height="1" /><rect x="15" y="10" width="1" height="1" />
                    <rect x="0" y="11" width="1" height="1" /><rect x="1" y="11" width="1" height="1" /><rect x="2" y="11" width="1" height="1" /><rect x="13" y="11" width="1" height="1" /><rect x="14" y="11" width="1" height="1" /><rect x="15" y="11" width="1" height="1" />
                    <rect x="0" y="12" width="1" height="1" /><rect x="1" y="12" width="1" height="1" /><rect x="14" y="12" width="1" height="1" /><rect x="15" y="12" width="1" height="1" />
                    <rect x="0" y="13" width="1" height="1" /><rect x="1" y="13" width="1" height="1" /><rect x="14" y="13" width="1" height="1" /><rect x="15" y="13" width="1" height="1" />
                    <rect x="0" y="14" width="1" height="1" /><rect x="1" y="14" width="1" height="1" /><rect x="2" y="14" width="1" height="1" /><rect x="3" y="14" width="1" height="1" /><rect x="4" y="14" width="1" height="1" /><rect x="5" y="14" width="1" height="1" /><rect x="6" y="14" width="1" height="1" /><rect x="7" y="14" width="1" height="1" /><rect x="8" y="14" width="1" height="1" /><rect x="9" y="14" width="1" height="1" /><rect x="10" y="14" width="1" height="1" /><rect x="11" y="14" width="1" height="1" /><rect x="12" y="14" width="1" height="1" /><rect x="13" y="14" width="1" height="1" /><rect x="14" y="14" width="1" height="1" /><rect x="15" y="14" width="1" height="1" />
                    <rect x="0" y="15" width="1" height="1" /><rect x="1" y="15" width="1" height="1" /><rect x="2" y="15" width="1" height="1" /><rect x="3" y="15" width="1" height="1" /><rect x="4" y="15" width="1" height="1" /><rect x="5" y="15" width="1" height="1" /><rect x="6" y="15" width="1" height="1" /><rect x="7" y="15" width="1" height="1" /><rect x="8" y="15" width="1" height="1" /><rect x="9" y="15" width="1" height="1" /><rect x="10" y="15" width="1" height="1" /><rect x="11" y="15" width="1" height="1" /><rect x="12" y="15" width="1" height="1" /><rect x="13" y="15" width="1" height="1" /><rect x="14" y="15" width="1" height="1" /><rect x="15" y="15" width="1" height="1" />
                  </g>
                </mask>
              </defs>
              <g mask="url(#furnace-mask)">
                <rect x="0" y="0" width="16" height="16" fill="#9e9e9e" />
                <rect x="0" y={16 - (currentRamPercent / 100) * 16} width="16" height={(currentRamPercent / 100) * 16} fill="rgb(0, 132, 255)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelRamChart;