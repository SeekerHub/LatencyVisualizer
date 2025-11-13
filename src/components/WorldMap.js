'use client';
import React, {useCallback,useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { exchangeServers, cloudRegions } from '../../public/data/data';
import Marker from './Marker';
import MapLegend from './MapLegend';
import CloudRegionMarker from './CloudRegionMarker';
import ServerInfoPanel from './ServerInfoPanel';
import CloudProviderFilter from './CloudProviderFilter';
import "../styles/common.css"
import LatencyDashboard from './LatencyDashboard';
import Earth from './Earth';



export default function WorldMap() {
  const [hoveredServer, setHoveredServer] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [visibleProviders, setVisibleProviders] = useState({ AWS: true, GCP: true, Azure: true });

  const handleProviderChange = useCallback(
    (p, checked) => setVisibleProviders(v => ({ ...v, [p]: checked })),
    []
  );

  return (
    <>
      {/* Server Info Panel */}
      <div className='container'>
      <div className='info-panel'>
        <ServerInfoPanel
          hoveredServer={hoveredServer}
          hoveredRegion={hoveredRegion}
        />

        <CloudProviderFilter
          visibleProviders={visibleProviders}
          handleProviderChange={handleProviderChange}
        />
        

        <LatencyDashboard />
        <MapLegend />
      </div>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: '100%', height: '100%', background: 'black' }} 
      > 
        {/* Lights */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[-5, -2, -5]} intensity={0.3} color="blue" />
        <directionalLight position={[-5, -2, -5]} intensity={0.5} color="blue" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} />

       
        <Stars radius={150} depth={60} count={5000} factor={5} fade />

        <Earth />

        <mesh>
          <sphereGeometry args={[2.05, 64, 64]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.05}
          />
        </mesh>

        {exchangeServers.map(e => (
          <Marker key={e.name} data={e} onHover={setHoveredServer}   />
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

        
        <OrbitControls enableZoom enableRotate />
      </Canvas>
      </div>
    </>
  );
}

