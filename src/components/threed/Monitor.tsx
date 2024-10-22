/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 Monitor.glb -t 
*/
import { Html, useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

// Define the GLTF type for the monitor
type GLTFResult = GLTF & {
  nodes: {
    Cube042: THREE.Mesh;
    Cube042_1: THREE.Mesh;
    Cube042_2: THREE.Mesh;
  };
  materials: {
    monitor: THREE.MeshStandardMaterial;
    ["monitor.001"]: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};

export function Monitor(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/room/Monitor.glb") as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  // Set up frame loop to update hover, click effect, and pulsing effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material && (child as THREE.Mesh).isMesh) {
          (
            (child as THREE.Mesh).material as THREE.MeshStandardMaterial
          ).emissive = clicked
            ? new THREE.Color(0x00ff00) // Green color when clicked
            : hovered
              ? new THREE.Color(0xffde21) // yerrow when hovered
              : new THREE.Color(0x444444); // Subtle gray when not hovered or clicked
        }
      });
    }
    if (!hovered && !clicked && groupRef.current) {
      const elapsedTime = state.clock.getElapsedTime();

      // Control the speed and intensity of the pulse
      const pulseFrequency = 2; // Higher number increases the pulse speed
      const baseIntensity = 0.55; // Base intensity to avoid too dim
      const pulseAmplitude = 0.35; // How much the pulse should vary
      const pulseIntensity =
        Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude + baseIntensity;

      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material && (child as THREE.Mesh).isMesh) {
          // Clamp the intensity to avoid very high or low values
          const clampedPulseIntensity = THREE.MathUtils.clamp(
            pulseIntensity,
            0.1,
            1.0,
          );

          (
            (child as THREE.Mesh).material as THREE.MeshStandardMaterial
          ).emissiveIntensity = clampedPulseIntensity;
        }
      });
    }
  });

  // Handle pointer over event to set hovered state
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
  };

  // Handle pointer out event to unset hovered state
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
  };

  // Handle click event to navigate to the appropriate page
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setClicked(true);
    router.push("/planner");
  };

  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {hovered && (
        <Html position={[-2.313, 2.3, -2.496]}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              pointerEvents: "none",
              height: "40px",
              width: "200px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Plan Modules here!
          </div>
        </Html>
      )}
      <group
        position={[-2.313, 1.217, -2.496]}
        rotation={[0, 0.802, 0]}
        scale={[0.437, 0.017, 0.152]}
      >
        <mesh geometry={nodes.Cube042.geometry} material={materials.monitor} />
        <mesh
          geometry={nodes.Cube042_1.geometry}
          material={materials["monitor.001"]}
        />
        <mesh
          geometry={nodes.Cube042_2.geometry}
          material={nodes.Cube042_2.material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/room/Monitor.glb");
