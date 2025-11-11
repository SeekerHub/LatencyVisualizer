import React from 'react';

export default function ServerInfoPanel({ hoveredServer, hoveredRegion, loading, latencyMap, error }) {
  return (
    <div className='server-info-container'>
      <h3 style={{fontWeight: "bold"}}>Server Info</h3>
      {hoveredServer ? (
        <div>
          <div>Name: {hoveredServer.name}</div>
          <div>Provider: {hoveredServer.provider}</div>
          <div>Latency: {loading ? 'Loading...' : (latencyMap[hoveredServer.name] ?? '...')} ms</div>
        </div>
      ) : hoveredRegion ? (
        <div>
          <div>Cloud Region: {hoveredRegion.code}</div>
          <div>Provider: {hoveredRegion.provider}</div>
          <div>Servers: {hoveredRegion.servers}</div>
        </div>
      ) : <div>Hover over a server or region</div>}
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </div>
  );
}