import latLonToVector3 from "@/app/helpers/latLonToVector3";
import { memo } from "react";

// Add cloud region data and marker component near the top
const CloudRegionMarker = memo(({ region, visible, onHover }) => {
  if (!visible) return null;
  const colorMap = { AWS: 'orange', GCP: 'green', Azure: 'blue' };
  const position = latLonToVector3(region.lat, region.lon, 2.05);
  return (
    <group position={position}>
      {/* Main region marker */}
      <mesh
        onPointerOver={() => onHover(region)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color={colorMap[region.provider]} opacity={0.7} transparent />
      </mesh>
      {/* Region boundary/cluster */}
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={colorMap[region.provider]} opacity={0.18} transparent />
      </mesh>
    </group>
  );
});

export default CloudRegionMarker;