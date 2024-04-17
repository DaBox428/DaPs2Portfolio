import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

function GlassCubes() {
  const navigatorWidth = window.innerWidth;

  let hide = navigatorWidth < 1081;
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
    reflectivity: hide ? 0 : 2.1,
    specularIntensity: hide ? 0 : 1.15,
  };

  return (
    <>
      <mesh position={[-17, -12, 75]} ref={cubeClose}>
        <boxGeometry args={[10, 10, 10]} />
        <meshPhysicalMaterial {...materialPropsObj} />
      </mesh>
      <mesh position={[-8, 10, 60]} ref={cubeMed}>
        <boxGeometry args={[7, 7, 7]} />
        <meshPhysicalMaterial {...materialPropsObj} />
      </mesh>
      <mesh position={[13, 3, 42]} ref={cubeFar}>
        <boxGeometry args={[6, 6, 6]} />
        <meshPhysicalMaterial {...materialPropsObj} />
      </mesh>
    </>
  );
}

export default GlassCubes;
