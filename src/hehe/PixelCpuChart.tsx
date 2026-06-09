import React, { useEffect, useRef, useState } from 'react';

interface CpuFrame {
  time: string;
  layer1: number;
  layer2: number;
  layer3: number;
  layer4: number;
}

const API_BASE = 'http://127.0.0.1:8000';

const PixelCpuChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<CpuFrame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCpuPercent, setCurrentCpuPercent] = useState(0);

  const fetchCpuData = async () => {
    try {
      const hours = 10 / 60; 
      const step = 30; 

      const rangeRes = await fetch(`${API_BASE}/api/metrics/range?metric=cpu&hours=${hours}&step=${step}`);
      if (!rangeRes.ok) throw new Error(`HTTP ${rangeRes.status}`);
      const rangeData = await rangeRes.json();

      const currentRes = await fetch(`${API_BASE}/api/metrics`);
      if (!currentRes.ok) throw new Error(`HTTP ${currentRes.status}`);
      const currentData = await currentRes.json();
      const cpuPercent = Math.round(currentData.cpu_usage);
      setCurrentCpuPercent(cpuPercent);

      let points = rangeData.data;
      if (!points || points.length === 0) throw new Error('Нет данных CPU');

      const MAX_POINTS = 10;
      if (points.length > MAX_POINTS) {
        points = points.slice(-MAX_POINTS);
      }

      const frames: CpuFrame[] = points.map((point: any) => {
        const date = new Date(point.time * 1000);
        // Формат с секундами
        const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        let value = point.value;
        if (value === null || isNaN(value)) value = 0;
        value = Math.min(100, Math.max(0, value));
        return {
          time: timeStr,
          layer1: value * 0.25,
          layer2: value * 0.5,
          layer3: value * 0.75,
          layer4: value,
        };
      });

      setChartData(frames);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCpuData();
    const interval = setInterval(fetchCpuData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading || chartData.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    const pixelSize = 6;
    const gridWidth = 65;
    const gridHeight = 35;
    canvas.width = gridWidth * pixelSize;
    canvas.height = gridHeight * pixelSize;

    const colors = {
      bg: '#ffffff',
      layer4: '#4d7fff',
      layer3: '#709cff',
      layer2: '#94b8ff',
      layer1: '#d6e4ff',
    };

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
        if (testY < h1) ctx.fillStyle = colors.layer1;
        else if (testY < h2) ctx.fillStyle = colors.layer2;
        else if (testY < h3) ctx.fillStyle = colors.layer3;
        else if (testY < h4) ctx.fillStyle = colors.layer4;
        else continue;
        ctx.fillRect(x * pixelSize, invY * pixelSize, pixelSize, pixelSize);
        ctx.strokeStyle = colors.bg;
        ctx.strokeRect(x * pixelSize, invY * pixelSize, pixelSize, pixelSize);
      }
    }
  }, [chartData, loading]);

  const xStepDistance = chartData.length > 1 ? 486 / (chartData.length - 1) : 0;

  if (loading && chartData.length === 0) return <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка CPU...</div>;
  if (error) return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
      <div>Ошибка: {error}</div>
      <button onClick={fetchCpuData} style={{ marginTop: '10px' }}>Повторить</button>
    </div>
  );

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff' }}>
      <div style={{ position: 'relative', display: 'inline-block', padding: '45px 40px 55px 85px', width: '611px', height: '286px' }}>
        <svg viewBox="0 0 611 286" style={{ position: 'absolute', top: 0, left: 0, width: '611px', height: '286px', pointerEvents: 'none' }}>
          <g stroke="rgb(0, 132, 255)" strokeWidth="1.5" fill="none">
            <path d="M 0,15 L 0,0 L 225,0" />
            <path d="M 385,0 L 611,0 L 611,15" />
            <path d="M 0,271 L 0,286 L 20,286" />
            <path d="M 591,286 L 611,286 L 611,271" />
          </g>
          <line x1="75" y1="45" x2="75" y2="231" stroke="#ccc" strokeWidth="1" />
          {[100, 75, 50, 25, 0].map((val, idx) => {
            const yCoord = 45 + idx * (186 / 4);
            return (
              <g key={val}>
                <line x1="71" y1={yCoord} x2="75" y2={yCoord} stroke="#ccc" strokeWidth="1" />
                <text x="62" y={yCoord + 5} textAnchor="end" style={{ fontFamily: '"Jersey 10", monospace', fontSize: '18px', fill: 'black', userSelect: 'none' }}>{val}%</text>
              </g>
            );
          })}
          <line x1="85" y1="237" x2="571" y2="237" stroke="#ccc" strokeWidth="1" />
          {chartData.map((point, idx) => {
            // Прореживание: если точек больше 8, показываем каждую вторую
            if (chartData.length > 8 && idx % 2 !== 0) return null;
            const xCoord = 85 + idx * xStepDistance;
            return (
              <g key={idx}>
                <line x1={xCoord} y1="237" x2={xCoord} y2="241" stroke="#ccc" strokeWidth="1" />
                <text x={xCoord} y="258" textAnchor="middle" style={{ fontFamily: '"Jersey 10", monospace', fontSize: '16px', fill: 'black', userSelect: 'none' }}>{point.time}</text>
              </g>
            );
          })}
        </svg>

        <div style={{ position: 'absolute', top: '-15px', left: 'calc((611px - 150px) / 2)', width: '150px', fontFamily: '"Jersey 10", monospace', fontSize: '32px', color: 'rgb(0, 132, 255)', backgroundColor: '#fff', textAlign: 'center', zIndex: 10 }}>
          CPU {currentCpuPercent}%
        </div>
        <canvas ref={canvasRef} style={{ display: 'block', imageRendering: 'pixelated', width: '486px', height: '186px' }} />
      </div>
    </div>
  );
};

export default PixelCpuChart;