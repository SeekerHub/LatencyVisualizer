import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);
import { exchangeServers, cloudRegions } from "../../public/data/data";
import HistoricalTrends from "./HistoricalTrends";





// Latency color logic
const getColor = latency => {
  if (latency < 50) return "green";
  if (latency < 120) return "orange";
  return "red";
};

// AWS regions mapping for CloudPing endpoint
const awsRegionCodes = [
  "ap-southeast-1", "eu-west-1", "us-east-1"
];

function LatencyDashboard() {
  const [awsLatency, setAwsLatency] = useState({});
  const [historyMock, setHistoryMock] = useState([]);
  const [selectedServer, setSelectedServer] = useState(exchangeServers[0].name);
  const [selectedRegion, setSelectedRegion] = useState(cloudRegions[0].code);
  const [selectedRange, setSelectedRange] = useState("1h");

  const timeseriesData = {
  labels: historyMock.map(d =>
    new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  ),
  datasets: [
    {
      label: "Latency (ms)",
      data: historyMock.map(d => d.value),
      fill: false,
      backgroundColor: "#1976d2",
      borderColor: "#1976d2",
      pointBackgroundColor: historyMock.map(d => getColor(d.value)),
      tension: 0.15,
    },
  ],
};

  // Fetch AWS region latency every 10s
  useEffect(() => {
    async function fetchLatencies() {
      try {
        const res = await fetch("https://www.cloudping.info/api/latency");
        const j = await res.json();
        // Example response: { "ap-southeast-1": 34, "eu-west-1": 104, ... }
        setAwsLatency(j);
      } catch {
        // fallback mock
        setAwsLatency({
          "ap-southeast-1": 40,
          "eu-west-1": 110,
          "us-east-1": 55,
        });
      }
    }
    fetchLatencies();
    const interval = setInterval(fetchLatencies, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 900, margin: "0 auto", marginTop: "96px", marginLeft: "18px" }}>
      <h2>Real-Time Latency Connections (AWS Regions)</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {exchangeServers.map((ex) =>
          cloudRegions
            .filter(r => r.provider === ex.provider && awsRegionCodes.includes(r.code))
            .map((cr) => (
              <div key={ex.name + cr.code} style={{fontSize: "12px", borderRadius: 8, padding: 14, height: 65,
                background: "rgb(36 28 28)"
              }}>
                <strong>{ex.name}</strong> ({ex.provider}) <br/>
                <strong>{cr.code}</strong>
                <span style={{
                  display: "inline-block",
                  marginLeft: 8,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: getColor(awsLatency[cr.code]),
                  boxShadow: "0 0 10px " + getColor(awsLatency[cr.code]),
                }} />
                <span style={{
                  fontWeight: "bold",
                  marginLeft: 8,
                  color: getColor(awsLatency[cr.code])
                }}>
                  {awsLatency[cr.code] !== undefined
                    ? `${awsLatency[cr.code]} ms`
                    : "N/A"}
                </span>
              </div>
            ))
        )}
      </div>

      <HistoricalTrends
        region={selectedRegion}
      />
    </div>
  );
}

export default LatencyDashboard;
