'use client';
import React, {useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useLatency } from '@/app/hooks/useLatency';
import { exchangeServers, cloudRegions } from '../../public/data/data';
import LatencyLine from './LatencyLine';
import Marker from './Marker';
import MapLegend from './MapLegend';
import latLonToVector3 from '@/app/helpers/latLonToVector3';
// Helper: Convert lat/lon to 3D coordinates on the sphere
import CloudRegionMarker from './CloudRegionMarker';
import ServerInfoPanel from './ServerInfoPanel';
import CloudProviderFilter from './CloudProviderFilter';
import HistoricalLatencyPanel from './HistoricalLatencyPanel';
import "../styles/common.css"


function Earth() {
  const earthRef = useRef();

  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('/textures/earth_daymap.jpg');

  // useFrame(() => {
  //   if (earthRef.current) earthRef.current.rotation.y += 0.0008;
  // });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={earthTexture}
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
}





// --- Add a fixed-position legend box ---


export default function WorldMap() {
  const [hoveredServer, setHoveredServer] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [visibleProviders, setVisibleProviders] = useState({ AWS: true, GCP: true, Azure: true });

  // Use the real latency hook
  const { latencyMap, loading, error } = useLatency(exchangeServers, 10000);

  // History state: { [pair]: [{ timestamp, latency }] }
  const [latencyHistory, setLatencyHistory] = useState({});

  // Update history whenever latencyMap changes
  useEffect(() => {
    const now = new Date();
    setLatencyHistory(prev => {
      const updated = { ...prev };
      exchangeServers.forEach(server => {
        const pair = server.name;
        const latency = latencyMap[server.name];
        if (latency !== undefined) {
          const entry = { timestamp: now.toLocaleTimeString(), latency };
          updated[pair] = [...(updated[pair] || []), entry].slice(-30); // keep last 30 points
        }
      });
      return updated;
    });
  }, [latencyMap]);

  // UI state
  const [selectedPair, setSelectedPair] = useState(exchangeServers[0].name);
  const [timeRange, setTimeRange] = useState('1h');

  // Stats for selected pair
  const historyData = useMemo(() => latencyHistory[selectedPair] || [], [latencyHistory, selectedPair]);

  const stats = useMemo(() => {
    if (!historyData.length) return { min: 0, max: 0, avg: '0.0' };
    const latencies = historyData.map(d => d.latency);
    const avg = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(1);
    return {
      min: Math.min(...latencies).toFixed(2),
      max: Math.max(...latencies).toFixed(2),
      avg,
    };
  }, [historyData]);

  function filterByTimeRange(data, range) {
    const now = Date.now();
    let ms;
    switch (range) {
      case '1h': ms = 60 * 60 * 1000; break;
      case '24h': ms = 24 * 60 * 60 * 1000; break;
      case '7d': ms = 7 * 24 * 60 * 60 * 1000; break;
      case '30d': ms = 30 * 24 * 60 * 60 * 1000; break;
      default: ms = 60 * 60 * 1000;
    }
    return data.filter(d => {
      // If you store timestamps as Date objects or ISO strings, convert accordingly
      const t = new Date();
      t.setHours(...d.timestamp.split(':').map(Number)); // adjust if needed
      return now - t.getTime() <= ms;
    });
  }

  // Usage:
  const filteredHistory = useMemo(
    () => filterByTimeRange(historyData, timeRange),
    [historyData, timeRange]
  );

  const handleProviderChange = useCallback(
    (p, checked) => setVisibleProviders(v => ({ ...v, [p]: checked })),
    []
  );

  return (
    <>
      {/* Server Info Panel */}
      <ServerInfoPanel
        hoveredServer={hoveredServer}
        hoveredRegion={hoveredRegion}
        loading={loading}
        latencyMap={latencyMap}
        error={error}
      />

      <CloudProviderFilter
        visibleProviders={visibleProviders}
        handleProviderChange={handleProviderChange}
      />

      <HistoricalLatencyPanel
        stats={stats}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        filteredHistory={filteredHistory}
        selectedPair={selectedPair}
        setSelectedPair={setSelectedPair}
        exchangeServers={exchangeServers}
      />

      {/* Add the legend */}
      <MapLegend />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: '100%', height: '100%', background: 'black' }}
      >
        {/* Lights */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[-5, -2, -5]} intensity={0.3} color="blue" />
        <directionalLight position={[-5, -2, -5]} intensity={0.5} color="blue" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} />

        {/* Background */}
        <Stars radius={150} depth={60} count={5000} factor={5} fade />

        {/* Earth */}
        <Earth />

        {/* Subtle atmosphere glow */}
        <mesh>
          <sphereGeometry args={[2.05, 64, 64]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.05}
          />
        </mesh>

        {/* Exchange Server Markers */}
        {exchangeServers.map(e => (
          <Marker key={e.name} data={e} onHover={setHoveredServer} latency={latencyMap[e.name]}  />
        ))}

        {/* Cloud Region Markers */}
        {cloudRegions.map(region => (
          <CloudRegionMarker
            key={region.code}
            region={region}
            visible={visibleProviders[region.provider]}
            onHover={setHoveredRegion}
          />
        ))}

        {/* Latency lines */}
        {exchangeServers.map(e => {
          const start = latLonToVector3(e.lat, e.lon);
          const end = new THREE.Vector3(0, 0, 0); // Example: connect to origin
          return <LatencyLine key={e.name} start={start} end={end} latency={latencyMap[e.name] || 0} />;
        })}
        <OrbitControls enableZoom enableRotate />
      </Canvas>
    </>
  );
}

