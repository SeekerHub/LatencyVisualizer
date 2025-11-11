
import * as THREE from 'three';
const latLonToVector3 = (lat, lon, radius = 2) =>  {
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    typeof radius !== "number" ||
    isNaN(lat) ||
    isNaN(lon) ||
    isNaN(radius)
  ) {
    // fallback to origin if invalid
    return new THREE.Vector3(0, 0, 0);
  }
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}


export default latLonToVector3;