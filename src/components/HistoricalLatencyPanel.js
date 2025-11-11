import React from 'react';

export default function HistoricalLatencyPanel({
  stats,
  timeRange,
  setTimeRange,
  filteredHistory,
  selectedPair,
  setSelectedPair,
  exchangeServers
}) {
  return (
    <div className='parent-history-container'>
      <h4>Latency History: {selectedPair}</h4>
      <div>
        <span>Min: {stats.min} ms - </span>  
        <span>Max: {stats.max} ms - </span> 
        <span>Avg: {stats.avg} ms  </span>
      </div>
      <div>
        <label>Time Range:</label>
        <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
          <option value="1h">1 hour</option>
          <option value="24h">24 hours</option>
          <option value="7d">7 days</option>
          <option value="30d">30 days</option>
        </select>
      </div>
      <div style={{ height: 120, marginTop: 8, background: '#111', borderRadius: 4, padding: 4 }}>
        <svg width="300" height="100">
          {filteredHistory.map((d, i) => {
            const x = i * 10;
            const y = 90 - d.latency;
            return (
              <circle key={i} cx={x + 20} cy={y} r={4} fill="#00ff2a" />
            );
          })}
          {filteredHistory.map((d, i, arr) => {
            if (i === 0) return null;
            const x1 = (i - 1) * 10 + 20;
            const y1 = 90 - arr[i - 1].latency;
            const x2 = i * 10 + 20;
            const y2 = 90 - d.latency;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00ff2a" strokeWidth={2} />
            );
          })}
        </svg>
      </div>
      <div>
        <label>For:</label>
        <select value={selectedPair} onChange={e => setSelectedPair(e.target.value)}>
          {exchangeServers.map(pair => (
            <option key={pair.name} value={pair.name}>{pair.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}