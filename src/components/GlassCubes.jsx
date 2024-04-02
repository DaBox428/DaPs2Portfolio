import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

function GlassCubes() {
  const cubeClose = useRef();
  const cubeMed = useRef();
  const cubeFar = useRef();

  useFrame(({ clock }) => {
    cubeClose.current.rotation.z = 110 - clock.getElapsedTime() / 6;
    cubeClose.current.rotation.y = 150 - clock.getElapsedTime() / 5;

    cubeMed.current.rotation.z = -30 + clock.getElapsedTime() / 6;
    cubeMed.current.rotation.y = -60 + clock.getElapsedTime() / 6;
    cubeFar.current.rotation.x = 80 - clock.getElapsedTime() / 6;

    cubeFar.current.rotation.z = 50 - clock.getElapsedTime() / 6;
    cubeFar.current.rotation.y = 40 - clock.getElapsedTime() / 6;
    cubeFar.current.rotation.x = 40 - clock.getElapsedTime() / 6;
  });

  const materialPropsObj = {
    thickness: 1,
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 1,
    ior: 2.3,
    envMapIntensity: 25,
    color: "#4e4e4e",
    reflectivity: 2.1,
    specularIntensity: 1.15,
  };

  return (
    <>
      <mesh position={[-17, -12, 75]} ref={cubeClose}>
        <boxGeometry args={[10, 10, 10]} />
        <meshPhysicalMaterial {...materialPropsObj} />
      </mesh>
      <mesh position={[-10, 8, 60]} ref={cubeMed}>
        <boxGeometry args={[8, 8, 8]} />
        <meshPhysicalMaterial {...materialPropsObj} />
      </mesh>
      <mesh position={[13, 5, 42]} ref={cubeFar}>
        <boxGeometry args={[7, 7, 7]} />
        <meshPhysicalMaterial {...materialPropsObj} />
      </mesh>
    </>
  );
}

export default GlassCubes;
