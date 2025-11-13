import { useRef } from "react";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
const Earth = () => {
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


export default Earth;