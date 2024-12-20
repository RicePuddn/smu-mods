/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 fp_room.glb -T -t 
Files: fp_room.glb [2.21MB] > C:\Users\ernes\Desktop\School\WAD2\study-room\source\fp_room-transformed.glb [183.97KB] (92%)
*/

import type * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    table: THREE.Mesh;
    Plane002: THREE.Mesh;
    Plane004: THREE.Mesh;
    keyboard_back: THREE.Mesh;
    Plane006: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cylinder: THREE.Mesh;
    Cube014: THREE.Mesh;
    FunshineBear_1: THREE.Mesh;
    FunshineBear_2: THREE.Mesh;
    FunshineBear_3: THREE.Mesh;
    FunshineBear_4: THREE.Mesh;
    Window_Glass: THREE.Mesh;
  };
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial;
    PaletteMaterial002: THREE.MeshStandardMaterial;
    PaletteMaterial003: THREE.MeshStandardMaterial;
    PaletteMaterial004: THREE.MeshStandardMaterial;
    PaletteMaterial005: THREE.MeshStandardMaterial;
    PaletteMaterial006: THREE.MeshPhysicalMaterial;
    PaletteMaterial007: THREE.MeshStandardMaterial;
    acmat_0: THREE.MeshStandardMaterial;
    acmat_1: THREE.MeshStandardMaterial;
    acmat_2: THREE.MeshStandardMaterial;
    acmat_3: THREE.MeshStandardMaterial;
    PaletteMaterial008: THREE.MeshPhysicalMaterial;
  };
  animations: THREE.AnimationClip[];
};

export function FP_room(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/room/fp_room-transformed.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.table.geometry}
        material={materials.PaletteMaterial001}
        position={[-2.333, 1.2, -2.486]}
        scale={[1, 1, 0.7]}
      />
      <mesh
        geometry={nodes.Plane002.geometry}
        material={materials.PaletteMaterial002}
        position={[-0.042, 0.564, -2.039]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.262, 1.102, 0.525]}
      />
      <mesh
        geometry={nodes.Plane004.geometry}
        material={materials.PaletteMaterial003}
        position={[-2.859, 1.207, -0.753]}
        rotation={[0, 0.111, 0]}
        scale={[0.315, 0.231, 0.608]}
      />
      <mesh
        geometry={nodes.keyboard_back.geometry}
        material={materials.PaletteMaterial004}
        position={[-1.533, 1.221, -2.284]}
        rotation={[0, 0.137, -Math.PI]}
        scale={[-0.41, -0.021, -0.161]}
      />
      <mesh
        geometry={nodes.Plane006.geometry}
        material={materials.PaletteMaterial005}
        position={[-2.975, 1.207, -1.055]}
        rotation={[0, 0.029, 0]}
        scale={[0.175, 0.281, 0.28]}
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={materials.PaletteMaterial006}
        position={[-3.039, 1.602, -2.364]}
        scale={[0.193, 0.406, 0.451]}
      />
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        position={[-3.175, 1.769, -1.94]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.004, 0.017, 0.004]}
      />
      <mesh
        geometry={nodes.Cube014.geometry}
        material={materials.PaletteMaterial007}
        position={[-2.476, 1.227, -1.875]}
        rotation={[0, -0.491, -Math.PI / 2]}
        scale={[0.03, 0.166, 0.175]}
      />
      <group
        position={[2.673, -0.031, -2.733]}
        rotation={[Math.PI / 2, 0, 0.611]}
        scale={25}
      >
        <mesh
          geometry={nodes.FunshineBear_1.geometry}
          material={materials.acmat_0}
        />
        <mesh
          geometry={nodes.FunshineBear_2.geometry}
          material={materials.acmat_1}
        />
        <mesh
          geometry={nodes.FunshineBear_3.geometry}
          material={materials.acmat_2}
        />
        <mesh
          geometry={nodes.FunshineBear_4.geometry}
          material={materials.acmat_3}
        />
      </group>
      <mesh
        geometry={nodes.Window_Glass.geometry}
        material={materials.PaletteMaterial008}
        position={[-3.444, 2.581, -1.155]}
        scale={[0.1, 0.9, 1.1]}
      />
    </group>
  );
}

useGLTF.preload("/room/fp_room-transformed.glb");
