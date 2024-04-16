import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import FakeGlowMaterial from "../components/FakeGlowMaterial";
import { useState } from "react";

export default function Buu({ isHovering, ...props }) {
  const { nodes, materials } = useGLTF("/buu.glb");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group {...props} dispose={null}>
      <group name="AuxScene">
        <mesh
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
          name="BUK_avt"
          castShadow
          receiveShadow
          geometry={nodes.BUK_avt.geometry}
          material={materials.BUK_avt_base_png}
          userData={{ name: "BUK_avt" }}
        />
        {isHovered && (
          <>
            <mesh position={[0, 27, -60]}>
              <sphereGeometry args={[15]} />
              <meshStandardMaterial
                color={0xffffff}
                toneMapped={false}
                opacity={1}
              />
              <FakeGlowMaterial
                falloff={1}
                glowSharpness={1}
                glowColor="#588ed5"
              ></FakeGlowMaterial>
            </mesh>
            <mesh position={[0, 27, -60]}>
              <sphereGeometry args={[5]} />
              <meshStandardMaterial
                color={0xffffff}
                toneMapped={false}
                opacity={1}
              />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/buu.glb");
