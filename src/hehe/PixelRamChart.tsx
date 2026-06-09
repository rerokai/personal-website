import React, { useEffect, useRef, useState } from 'react';

interface RamFrame {
  time: string;
  ramPercent: number;
}

const API_BASE = '';

const PixelRamChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<RamFrame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRamPercent, setCurrentRamPercent] = useState(0);

  const fetchRamData = async () => {
    try {

      const hours = 10 / 60;
      const step = 75;
      const ramResp = await fetch(`${API_BASE}/api/metrics/range?metric=ram&hours=${hours}&step=${step}`);
      if (!ramResp.ok) throw new Error(`RAM HTTP ${ramResp.status}`);
      const ramData = await ramResp.json();
      let ramPoints = ramData.data || [];
      if (ramPoints.length === 0) throw new Error('Нет данных RAM');


      const currentRes = await fetch(`${API_BASE}/api/metrics`);
      if (!currentRes.ok) throw new Error(`Current metrics HTTP ${currentRes.status}`);
      const currentData = await currentRes.json();
      const currentRam = Math.round(currentData.ram_usage);
      setCurrentRamPercent(currentRam);

      let historyValues = ramPoints.map((p: any) => Math.min(100, Math.max(0, p.value || 0)));
      while (historyValues.length < 8) historyValues.push(historyValues[historyValues.length - 1]);
      if (historyValues.length > 8) historyValues = historyValues.slice(-8);

      const now = new Date();
      const totalMinutes = 10;
      const stepMinutes = totalMinutes / 8; 
      const frames: RamFrame[] = [];


      for (let i = 0; i < 8; i++) {
        const pointTime = new Date(now.getTime() - (8 - i) * stepMinutes * 60 * 1000);
        const timeStr = `${String(pointTime.getHours()).padStart(2, '0')}:${String(pointTime.getMinutes()).padStart(2, '0')}`;
        frames.push({ time: timeStr, ramPercent: historyValues[i] });
      }

      const nowStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      frames.push({ time: nowStr, ramPercent: currentRam });

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
    fetchRamData();
    const interval = setInterval(fetchRamData, 10000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (loading || chartData.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 344;
    canvas.height = 186;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = 28;
    const gapBetweenPoints = 8;
    const startX = 10;
    const totalWidthPerPoint = barWidth + gapBetweenPoints;
    const totalWidth = chartData.length * totalWidthPerPoint;
    let offsetX = startX;
    if (totalWidth < canvas.width - startX) {
      offsetX = startX + (canvas.width - startX - totalWidth) / 2;
    }

    chartData.forEach((point, idx) => {
      const x = offsetX + idx * totalWidthPerPoint;
      const ramHeight = (point.ramPercent / 100) * canvas.height;
      ctx.fillStyle = '#4d7fff';
      ctx.fillRect(x, canvas.height - ramHeight, barWidth, ramHeight);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, canvas.height - ramHeight, barWidth, ramHeight);
    });
  }, [chartData, loading]);

  if (loading && chartData.length === 0) return <div style={{ padding: '20px' }}>Загрузка RAM...</div>;
  if (error) return (
    <div style={{ padding: '20px', color: 'red' }}>
      <div>Ошибка: {error}</div>
      <button onClick={fetchRamData}>Повторить</button>
    </div>
  );

  const barWidth = 28;
  const gapBetweenPoints = 8;
  const startX = 10;
  const totalWidthPerPoint = barWidth + gapBetweenPoints;
  const totalWidth = chartData.length * totalWidthPerPoint;
  let offsetX = startX;
  if (totalWidth < 344 - startX) {
    offsetX = startX + (344 - startX - totalWidth) / 2;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff' }}>
      <div style={{ position: 'relative', display: 'inline-block', padding: '45px 40px 55px 85px', width: '611px', height: '286px' }}>
        <svg viewBox="0 0 611 286" style={{ position: 'absolute', top: 0, left: 0, width: '611px', height: '286px', pointerEvents: 'none' }}>
          <g stroke="rgb(0, 132, 255)" strokeWidth="1" fill="none">
            <path d="M 0,15 L 0,0 L 225,0" />
            <path d="M 385,0 L 611,0 L 611,15" />
            <path d="M 0,271 L 0,286 L 20,286" />
            <path d="M 591,286 L 611,286 L 611,271" />
          </g>
          <line x1="75" y1="45" x2="75" y2="231" stroke="#ccc" strokeWidth="1" />
          {[100, 80, 60, 40, 20, 0].map((val, idx) => {
            const yCoord = 45 + idx * (186 / 5);
            return (
              <g key={val}>
                <line x1="71" y1={yCoord} x2="75" y2={yCoord} stroke="#ccc" strokeWidth="1" />
                <text x="62" y={yCoord + 5} textAnchor="end" style={{ fontFamily: '"Jersey 10", monospace', fontSize: '18px', fill: 'black' }}>{val}%</text>
              </g>
            );
          })}
          <line x1="85" y1="237" x2="429" y2="237" stroke="#ccc" strokeWidth="1" />
          {chartData.map((point, idx) => {
            const centerX = 85 + offsetX + idx * totalWidthPerPoint + barWidth / 2;
            return (
              <g key={idx}>
                <line x1={centerX} y1="237" x2={centerX} y2="241" stroke="#ccc" strokeWidth="1" />
                <text x={centerX} y="258" textAnchor="middle" style={{ fontFamily: '"Jersey 10", monospace', fontSize: '16px', fill: 'black' }}>{point.time}</text>
              </g>
            );
          })}
        </svg>

        <div style={{ position: 'absolute', top: '-15px', left: 'calc((611px - 150px) / 2)', width: '150px', fontFamily: '"Jersey 10", monospace', fontSize: '32px', color: 'rgb(0, 132, 255)', backgroundColor: '#fff', textAlign: 'center', zIndex: 10 }}>
          RAM
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', width: '486px' }}>
          <canvas ref={canvasRef} style={{ display: 'block', imageRendering: 'pixelated', width: '344px', height: '186px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <div style={{ fontFamily: '"Jersey 10", monospace', fontSize: '36px', color: 'rgb(0, 132, 255)', marginBottom: '10px' }}>{currentRamPercent}%</div>
            <svg width="112" height="112" viewBox="0 0 16 16" style={{ shapeRendering: 'crispEdges' }}>
              <defs>
                <mask id="furnace-mask">
                  <rect x="0" y="0" width="16" height="16" fill="black" />
                  <g fill="white">
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

