
import latLonToVector3 from "@/app/helpers/latLonToVector3";
import { useState, useRef, memo } from "react";

const Marker = memo(({ data, onHover }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const colorMap = { AWS: 'orange', GCP: 'green', Azure: 'blue' };
  const position = latLonToVector3(data.lat, data.lon);

  return (
    <group position={position}>
      {/* Main marker sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => { setHovered(true); onHover(data); }}
        onPointerOut={() => { setHovered(false); onHover(null); }}
        scale={hovered ? 1.4 : 1}
      >
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial
          color={hovered ? 'yellow' : colorMap[data.provider]}
          emissive={hovered ? 'yellow' : colorMap[data.provider]}
          emissiveIntensity={hovered ? 0.8 : 0.3}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={hovered ? 1.6 : 1.2}>
        <torusGeometry args={[0.09, 0.012, 16, 32]} />
        <meshBasicMaterial
          color={hovered ? 'yellow' : colorMap[data.provider]}
          transparent
          opacity={hovered ? 0.7 : 0.4}
        />
      </mesh>
    </group>
  );
});

export default  Marker;