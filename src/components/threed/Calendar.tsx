/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 Calendar.glb -t 
*/
import { Html, useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

import { APP_CONFIG } from "@/config";

// Define the GLTF type for the calendar
type GLTFResult = GLTF & {
  nodes: {
    Calendar_Page: THREE.Mesh;
    Cylinder: THREE.Mesh;
    Cylinder_1: THREE.Mesh;
  };
  materials: {
    ["Material.009"]: THREE.MeshStandardMaterial;
    ["Material.005"]: THREE.MeshStandardMaterial;
    ["Material.008"]: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};

export function Calendar(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/room/Calendar.glb") as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const calendarTextureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    // Create a canvas element and draw a simple calendar
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d");

    if (context) {
      // Draw the background
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Set up calendar styles
      context.fillStyle = "#000000";
      context.font = "bold 70px Arial";
      context.textAlign = "center";

      context.translate(0, canvas.height);
      context.scale(1, -1);

      // Get today's date
      const today = new Date();
      const month = today.toLocaleString("default", { month: "long" });
      const year = today.getFullYear();
      const day = today.getDate();

      // Draw the month and year
      context.fillText(`${month} ${year}`, canvas.width / 2, 100);

      // Draw the days of the week
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      context.font = "30px Arial";
      daysOfWeek.forEach((day, index) => {
        context.fillText(day, 60 + index * 60, 150);
      });

      // Draw the calendar days
      const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ).getDay();
      const totalDays = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      ).getDate();
      let x = firstDay;
      let y = 210;

      context.font = "40px Arial";
      for (let date = 1; date <= totalDays; date++) {
        if (date === day) {
          // Highlight today's date
          context.fillStyle = "#FF0000";
        } else {
          context.fillStyle = "#000000";
        }
        context.fillText(`${date}`, 60 + x * 60, y);
        x++;
        if (x > 6) {
          x = 0;
          y += 50;
        }
      }

      // Create a texture from the canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      calendarTextureRef.current = texture;
    }
  }, []); // Only run once to capture today's date

  // Set up frame loop to update hover, click effect, and pulsing effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).material && (child as THREE.Mesh).isMesh) {
          (
            (child as THREE.Mesh).material as THREE.MeshStandardMaterial
          ).emissive = clicked
            ? new THREE.Color(0x00ff00) // Red when clicked
            : hovered
              ? new THREE.Color(0xffde21) // Green when hovered
              : new THREE.Color(0x888888); // Subtle gray when not hovered or clicked
        }
      });
    }

    if (!hovered && !clicked && groupRef.current) {
      const elapsedTime = state.clock.getElapsedTime();

      // Control the speed and intensity of the pulse
      const pulseFrequency = 2; // Higher number increases the pulse speed
      const baseIntensity = 0.55; // Base intensity to avoid too dim
      const pulseAmplitude = 0.25; // How much the pulse should vary
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
    router.push(`/timetable/${APP_CONFIG.currentTerm}`);
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
        <Html position={[-0.6, 1.45, -2.5]}>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              pointerEvents: "none",
              height: "40px",
              width: "220px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            View Timetable Here!
          </div>
        </Html>
      )}
      <mesh
        geometry={nodes.Calendar_Page.geometry}
        material={materials["Material.009"]}
        position={[-0.117, 1.647, -3.181]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.39, 1, 0.24]}
      >
        {calendarTextureRef.current && (
          <meshStandardMaterial map={calendarTextureRef.current} />
        )}
      </mesh>
      <group
        position={[-0.117, 1.893, -3.187]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.01, 0.4, 0.01]}
      >
        <mesh
          geometry={nodes.Cylinder.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          geometry={nodes.Cylinder_1.geometry}
          material={materials["Material.008"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/room/Calendar.glb");
