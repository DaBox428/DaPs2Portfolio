import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Hominid(props) {
  const { nodes, materials } = useGLTF("/hominid.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0203rip.geometry}
        material={materials.alien}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/hominid.glb");
