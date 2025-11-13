import React from 'react';

export default function ServerInfoPanel({ hoveredServer, hoveredRegion, error }) {
  return (
    <div className='server-info-container'>
      <h3 style={{fontWeight: "bold"}}>Server Info</h3>
      {hoveredServer ? (
        <div>
          <div><strong>Name:</strong> {hoveredServer.name}</div>
          <div><strong>Provider</strong>: {hoveredServer.provider}</div>
          {/* <div><strong>Latency</strong>: {loading ? 'Loading...' : (latencyMap[hoveredServer.name] ?? '...')} ms</div> */}
        </div>
      ) : hoveredRegion ? (
        <div>
          <div><strong>Cloud Region</strong>: {hoveredRegion.code}</div>
          <div><strong>Provider</strong>: {hoveredRegion.provider}</div>
          <div><strong>Servers</strong>: {hoveredRegion.servers}</div>
        </div>
      ) : <div>Hover over a server or region</div>}
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </div>
  );
}