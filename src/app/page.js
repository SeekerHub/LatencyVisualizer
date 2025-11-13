"use client"
import dynamic from 'next/dynamic';

const WorldMap = dynamic(() => import('../components/WorldMap'), { ssr: false });

// const WorldMapNew = dynamic(() => import('../components/WorldMapNew'), { ssr: false });

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <WorldMap />
      
    </main>
  );
}
