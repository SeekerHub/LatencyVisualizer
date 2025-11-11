import { useFrame } from "@react-three/fiber";
import { useState, useRef, memo } from "react";

import * as THREE from 'three';
const LatencyLine = memo(({ start, end, latency }) => {
  const ref = useRef();
  const [dashOffset, setDashOffset] = useState(0);

  useFrame(() => {
    setDashOffset(prev => (prev + 0.01) % 1);
    if (ref.current) ref.current.material.dashOffset = dashOffset;
  });

  // More vibrant colors and glow effect
  const color =
    latency < 50 ? '#00ff2a' : latency < 100 ? '#ffe600' : '#ff2a2a';

  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
  return (
    <line ref={ref}>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial
        color={color}
        linewidth={12} // Increased thickness (may not work in all browsers)
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending} // Additive blending for glow
      />
    </line>
  );
});

export default LatencyLine;