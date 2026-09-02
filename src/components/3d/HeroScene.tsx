import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Icosahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

const CyberShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  // Rotate the shapes slowly
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= delta * 0.1;
      wireframeRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <group>
        {/* Inner solid glowing core */}
        <Icosahedron ref={meshRef} args={[1, 1]} scale={1.2}>
          <MeshDistortMaterial
            color="#6366f1" // indigo-500
            emissive="#4338ca" // indigo-700
            emissiveIntensity={2}
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Icosahedron>

        {/* Outer wireframe shell */}
        <Icosahedron ref={wireframeRef} args={[1.5, 2]} scale={1.4}>
          <meshStandardMaterial
            color="#a855f7" // purple-500
            wireframe
            transparent
            opacity={0.6}
            emissive="#9333ea"
            emissiveIntensity={1}
          />
        </Icosahedron>

        {/* Floating particles around it */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Sphere
            key={i}
            args={[0.03, 8, 8]}
            position={[
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6
            ]}
          >
            <meshBasicMaterial color="#e879f9" />
          </Sphere>
        ))}
      </group>
    </Float>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#c084fc" />
        
        <React.Suspense fallback={null}>
          <CyberShape />
        </React.Suspense>
        
        {/* Allows user to drag and rotate the model */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};
