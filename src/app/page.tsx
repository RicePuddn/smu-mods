"use client";

import { Bookshelf } from "@/components/threed/Bookshelf";
import { Calendar } from "@/components/threed/Calendar";
import { Monitor } from "@/components/threed/Monitor";
import { NoticeBoard } from "@/components/threed/NoticeBoard";
import { Room } from "@/components/threed/Room";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

// Loading fall back page
function LoadingFallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      <h1 className="mb-4 text-5xl font-bold">Welcome to SMU Mods</h1>
      <p className="mb-8 text-xl">
        Your ultimate university module planning tool
      </p>
      <div className="mb-8 flex space-x-4">
        <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-white p-2 shadow-lg ring-1 ring-slate-900/5 dark:ring-slate-200/20">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      <p className="text-lg">Loading your personalized study space...</p>
      <div className="mt-8 h-4 w-64 rounded-full bg-blue-200">
        <div className="h-4 animate-pulse rounded-full bg-blue-600"></div>
      </div>
    </div>
  );
}
// Simplified Scene Component
function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const { camera } = useThree();
  const lookAtPoint = new THREE.Vector3(-0.8, 2.5, 0);
  const currentPosition = useRef(new THREE.Vector3(0, 2.8, 1.5));

  useEffect(() => {
    if (cameraRef.current) {
      camera.position.copy(currentPosition.current);
      camera.lookAt(lookAtPoint);
    }
  }, [camera]);

  useFrame((state) => {
    if (cameraRef.current) {
      const { mouse } = state;
      const rotationY = THREE.MathUtils.lerp(
        -Math.PI / 4,
        Math.PI / 3,
        (mouse.x + 1) / 2,
      );
      const radius = 2.5;
      const startAngle = Math.atan2(1.5 - lookAtPoint.z, 0 - lookAtPoint.x);
      const targetX = lookAtPoint.x + radius * Math.cos(startAngle + rotationY);
      const targetZ = lookAtPoint.z + radius * Math.sin(startAngle + rotationY);
      const easeAmount = 0.05;
      currentPosition.current.x +=
        (targetX - currentPosition.current.x) * easeAmount;
      currentPosition.current.z +=
        (targetZ - currentPosition.current.z) * easeAmount;
      currentPosition.current.y = 2.8;
      cameraRef.current.position.copy(currentPosition.current);
      cameraRef.current.lookAt(lookAtPoint);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={70}
        near={0.1}
        far={100}
      />
      {/* Camera Controls for Mobile Users */}
      <OrbitControls
        target={lookAtPoint}
        enableDamping
        dampingFactor={0.25}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enableZoom={false}
      />
      {/* Ambient Light */}
      <ambientLight intensity={0.6} />
      {/* Directional Light */}
      <directionalLight
        position={[-4, 3, -1]}
        intensity={4.5}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      {/* Room Model */}
      <Monitor />
      <Bookshelf />
      <Calendar />
      <NoticeBoard />
      <Room />
    </>
  );
}

// Home Component
export default function Home() {
  return (
    <div className="h-screen w-full">
      <Suspense fallback={LoadingFallback()}>
        <Canvas style={{ background: "lightblue" }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
