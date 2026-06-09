import React, { useEffect, useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

interface DiskData {
  name: string;
  percent: number;
}

const PixelDiskChart: React.FC = () => {
  const [disk, setDisk] = useState<DiskData>({ name: '/', percent: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDisk = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/metrics`);
      if (!res.ok) throw new Error('Ошибка загрузки данных диска');
      const data = await res.json();
      const percent = Math.min(100, Math.max(0, data.disk_usage ?? 0));
      setDisk({ name: '/', percent: Math.round(percent) });
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisk();
    const interval = setInterval(fetchDisk, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalTicks = 32;
  const activeTicks = Math.round((disk.percent / 100) * totalTicks);

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка диска...</div>;
  if (error) return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
      <div>Ошибка: {error}</div>
      <button onClick={fetchDisk}>Повторить</button>
    </div>
  );

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff' }}>
      <div style={{ position: 'relative', display: 'inline-block', padding: '45px 40px 55px 85px', width: '611px', height: '286px' }}>
        {/* SVG рамка */}
        <svg viewBox="0 0 611 286" style={{ position: 'absolute', top: 0, left: 0, width: '611px', height: '286px', pointerEvents: 'none' }}>
          <g stroke="rgb(0, 132, 255)" strokeWidth="1" fill="none">
            <path d="M 0,15 L 0,0 L 225,0" />
            <path d="M 385,0 L 611,0 L 611,15" />
            <path d="M 0,221 L 0,238 L 20,238" />
            <path d="M 591,238 L 611,238 L 611,221" />
          </g>
        </svg>

        <div style={{ position: 'absolute', top: '-15px', left: 'calc((611px - 150px) / 2)', width: '150px', fontFamily: '"Jersey 10", monospace', fontSize: '32px', color: 'rgb(0, 132, 255)', backgroundColor: '#fff', textAlign: 'center', letterSpacing: '2px', zIndex: 10 }}>
          DISK
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '486px' }}>

          <div style={{ width: '348px', display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left', marginLeft: '-20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontFamily: '"Jersey 10", monospace', fontSize: '22px', color: 'black', userSelect: 'none', paddingLeft: '2px' }}>
                {disk.name}
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: totalTicks }).map((_, i) => (
                  <div key={i} style={{ width: '7px', height: '24px', backgroundColor: i < activeTicks ? 'rgb(0,132,255)' : '#c8c8c8' }} />
                ))}
              </div>
            </div>
          </div>


          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontFamily: '"Jersey 10", monospace', fontSize: '36px', color: 'rgb(0, 132, 255)', marginBottom: '5px', userSelect: 'none' }}>
              {disk.percent}%
            </div>
            <svg width="112" height="112" viewBox="0 0 14 14" style={{ shapeRendering: 'crispEdges' }}>
              <defs>
                <mask id="chest-mask">
                  <rect x="0" y="0" width="14" height="14" fill="black" />
                  <g fill="white">

                    <rect x="0" y="0" width="1" height="1" /><rect x="1" y="0" width="1" height="1" /><rect x="2" y="0" width="1" height="1" /><rect x="3" y="0" width="1" height="1" /><rect x="4" y="0" width="1" height="1" /><rect x="5" y="0" width="1" height="1" /><rect x="6" y="0" width="1" height="1" /><rect x="7" y="0" width="1" height="1" /><rect x="8" y="0" width="1" height="1" /><rect x="9" y="0" width="1" height="1" /><rect x="10" y="0" width="1" height="1" /><rect x="11" y="0" width="1" height="1" /><rect x="12" y="0" width="1" height="1" /><rect x="13" y="0" width="1" height="1" />
                    <rect x="0" y="1" width="1" height="1" /><rect x="1" y="1" width="1" height="1" /><rect x="2" y="1" width="1" height="1" /><rect x="3" y="1" width="1" height="1" /><rect x="4" y="1" width="1" height="1" /><rect x="5" y="1" width="1" height="1" /><rect x="6" y="1" width="1" height="1" /><rect x="7" y="1" width="1" height="1" /><rect x="8" y="1" width="1" height="1" /><rect x="9" y="1" width="1" height="1" /><rect x="10" y="1" width="1" height="1" /><rect x="11" y="1" width="1" height="1" /><rect x="12" y="1" width="1" height="1" /><rect x="13" y="1" width="1" height="1" />
                    <rect x="0" y="2" width="1" height="1" /><rect x="1" y="2" width="1" height="1" /><rect x="12" y="2" width="1" height="1" /><rect x="13" y="2" width="1" height="1" />
                    <rect x="0" y="3" width="1" height="1" /><rect x="1" y="3" width="1" height="1" /><rect x="6" y="3" width="1" height="1" /><rect x="7" y="3" width="1" height="1" /><rect x="12" y="3" width="1" height="1" /><rect x="13" y="3" width="1" height="1" />
                    <rect x="0" y="4" width="1" height="1" /><rect x="1" y="4" width="1" height="1" /><rect x="2" y="4" width="1" height="1" /><rect x="3" y="4" width="1" height="1" /><rect x="4" y="4" width="1" height="1" /><rect x="5" y="4" width="1" height="1" /><rect x="6" y="4" width="1" height="1" /><rect x="7" y="4" width="1" height="1" /><rect x="8" y="4" width="1" height="1" /><rect x="9" y="4" width="1" height="1" /><rect x="10" y="4" width="1" height="1" /><rect x="11" y="4" width="1" height="1" /><rect x="12" y="4" width="1" height="1" /><rect x="13" y="4" width="1" height="1" />
                    <rect x="0" y="5" width="1" height="1" /><rect x="1" y="5" width="1" height="1" /><rect x="2" y="5" width="1" height="1" /><rect x="3" y="5" width="1" height="1" /><rect x="4" y="5" width="1" height="1" /><rect x="5" y="5" width="1" height="1" /><rect x="6" y="5" width="1" height="1" /><rect x="7" y="5" width="1" height="1" /><rect x="8" y="5" width="1" height="1" /><rect x="9" y="5" width="1" height="1" /><rect x="10" y="5" width="1" height="1" /><rect x="11" y="5" width="1" height="1" /><rect x="12" y="5" width="1" height="1" /><rect x="13" y="5" width="1" height="1" />
                    <rect x="0" y="6" width="1" height="1" /><rect x="1" y="6" width="1" height="1" /><rect x="6" y="6" width="1" height="1" /><rect x="7" y="6" width="1" height="1" /><rect x="12" y="6" width="1" height="1" /><rect x="13" y="6" width="1" height="1" />
                    <rect x="0" y="7" width="1" height="1" /><rect x="1" y="7" width="1" height="1" /><rect x="12" y="7" width="1" height="1" /><rect x="13" y="7" width="1" height="1" />
                    <rect x="0" y="8" width="1" height="1" /><rect x="1" y="8" width="1" height="1" /><rect x="12" y="8" width="1" height="1" /><rect x="13" y="8" width="1" height="1" />
                    <rect x="0" y="9" width="1" height="1" /><rect x="1" y="9" width="1" height="1" /><rect x="12" y="9" width="1" height="1" /><rect x="13" y="9" width="1" height="1" />
                    <rect x="0" y="10" width="1" height="1" /><rect x="1" y="10" width="1" height="1" /><rect x="12" y="10" width="1" height="1" /><rect x="13" y="10" width="1" height="1" />
                    <rect x="0" y="11" width="1" height="1" /><rect x="1" y="11" width="1" height="1" /><rect x="12" y="11" width="1" height="1" /><rect x="13" y="11" width="1" height="1" />
                    <rect x="0" y="12" width="1" height="1" /><rect x="1" y="12" width="1" height="1" /><rect x="2" y="12" width="1" height="1" /><rect x="3" y="12" width="1" height="1" /><rect x="4" y="12" width="1" height="1" /><rect x="5" y="12" width="1" height="1" /><rect x="6" y="12" width="1" height="1" /><rect x="7" y="12" width="1" height="1" /><rect x="8" y="12" width="1" height="1" /><rect x="9" y="12" width="1" height="1" /><rect x="10" y="12" width="1" height="1" /><rect x="11" y="12" width="1" height="1" /><rect x="12" y="12" width="1" height="1" /><rect x="13" y="12" width="1" height="1" />
                    <rect x="0" y="13" width="1" height="1" /><rect x="1" y="13" width="1" height="1" /><rect x="2" y="13" width="1" height="1" /><rect x="3" y="13" width="1" height="1" /><rect x="4" y="13" width="1" height="1" /><rect x="5" y="13" width="1" height="1" /><rect x="6" y="13" width="1" height="1" /><rect x="7" y="13" width="1" height="1" /><rect x="8" y="13" width="1" height="1" /><rect x="9" y="13" width="1" height="1" /><rect x="10" y="13" width="1" height="1" /><rect x="11" y="13" width="1" height="1" /><rect x="12" y="13" width="1" height="1" /><rect x="13" y="13" width="1" height="1" />
                  </g>
                </mask>
              </defs>
              <g mask="url(#chest-mask)">
                <rect x="0" y="0" width="14" height="14" fill="#9e9e9e" />
                <rect x="0" y={14 - (disk.percent / 100) * 14} width="14" height={(disk.percent / 100) * 14} fill="rgb(0, 132, 255)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelDiskChart;