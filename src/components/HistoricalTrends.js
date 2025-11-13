import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const getColor = latency => {
  if (latency < 50) return "green";
  if (latency < 120) return "orange";
  return "red";
};

const ranges = [
  { value: "1h", label: "1 Hour" },
  { value: "2h", label: "2 Hours" },
  { value: "24h", label: "24 Hours" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" }
];

export default function HistoricalLatencyTrends({
  region,
//   historyMock,
//   stats,
//   selectedRange,
//   onRangeChange,
  height = 350,
  maxWidth = 900
}) {
  const [selectedRange, setSelectedRange] = useState("1h");
  const [historyMock, setHistoryMock] = useState([]);
  const [stats, setStats] = useState({});
  useEffect(() => {
    // Generate new mock data on range change
    const rangeMap = { "1h": 24, "2h": 48, "24h": 96, "7d": 168, "30d": 240 };
    const samples = Array.from({ length: rangeMap[selectedRange] }, (_, idx) => ({
      timestamp: new Date(Date.now() - (rangeMap[selectedRange] - idx) * (60 * 60 * 1000) / rangeMap[selectedRange]).toISOString(),
      value: Math.round(40 + Math.random() * 60),
    }));
    setHistoryMock(samples);

    // Stats
    const vals = samples.map(d => d.value);
    setStats({
      min: Math.min(...vals),
      max: Math.max(...vals),
      avg: (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1),
    });
  }, [selectedRange]);


  const timeseriesData = {
    labels: historyMock?.map(d =>
      new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })
    ),
    datasets: [
      {
        label: "Latency (ms)",
        data: historyMock?.map(d => d.value),
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.12)",
        tension: 0.2,
        pointBackgroundColor: historyMock?.map(d => getColor(d.value)),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: `Latency Over Time (${region})` },
      tooltip: { callbacks: { label: ctx => `${ctx.parsed.y} ms` } }
    },
    scales: {
      x: { title: { display: true, text: "Time" }, ticks: { maxTicksLimit: 14 } },
      y: { title: { display: true, text: "Latency (ms)" }, min: 0 }
    }
  };

  return (
    <div className="trends">
      <div style={{ marginBottom: 8 }}>
        <label>
          Time Range:{" "}
          <select value={selectedRange} onChange={e => setSelectedRange(e.target.value)}>
            {ranges.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </label>
      </div>
      <strong>{region}</strong> Latency Time Series:<br />
      <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
        <span>Min: <strong>{stats.min}</strong> ms</span>
        <span style={{ marginLeft: 24 }}>Max: <strong>{stats.max}</strong> ms</span>
        <span style={{ marginLeft: 24 }}>Avg: <strong>{stats.avg}</strong> ms</span>
      </div>
      <div style={{ marginTop: 16, height: `${height - 80}px` }}>
        {(Array.isArray(historyMock) && historyMock.length)
          ? <Line data={timeseriesData} options={chartOptions} />
          : <em>No data</em>
        }
      </div>
    </div>
  );
}
