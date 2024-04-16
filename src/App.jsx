import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Line, Sphere, Trail } from "@react-three/drei";
import { useControls } from "leva";

import Towers from "./components/Towers.jsx";
import MemoryCard from "./components/MemoryCard.jsx";
import PreLoader from "./components/PreLoader.jsx";
import {
  EffectComposer,
  Vignette,
  Bloom,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction, BlurPass } from "postprocessing";

import GlassCubes from "./components/GlassCubes.jsx";

function App() {
  const [count, setCount] = useState(0);

  const loadingCanvas = useRef();
  const [showScreen, setShowScreen] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [fade, setFade] = useState(false);

  function handleChangeScreen(toScreen) {
    setShowScreen(toScreen);
  }

  useEffect(() => {
    const loading = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 200 /* 9000 */);
    };
    loading();
  }, []);

  function Effects() {
    return (
      <EffectComposer>
        {/*         <SSAO
          blendFunction={BlendFunction.NORMAL} // Use NORMAL to see the effect
          samples={31}
          radius={3}
          intensity={10}
        /> */}
        <Scanline
          density={1.8}
          opacity={0.75}
          blendFunction={BlendFunction.MULTIPLY}
        />
        <Vignette
          offset={0.5}
          darkness={0.7}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
        <Bloom
          radius={0.5}
          kernelSize={2}
          intensity={1}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.5}
        />
      </EffectComposer>
    );
  }

  function Electron({
    radius,
    speed = 1,
    zAxis,
    xAxis,
    yAxis,
    color,
    variation,
    customPosition,
    opposite,
    ...props
  }) {
    const ref = useRef();

    zAxis = zAxis - 40;

    xAxis = xAxis + 10;

    yAxis = yAxis + 10;
    useFrame((state) => {
      const t = state.clock.getElapsedTime() * speed - variation;

      ref.current.position.set(
        Math.sin(t) * xAxis * opposite,
        (Math.cos(t) * yAxis * Math.atan(t)) / Math.PI / 1.25,
        Math.sin(t * (30 / 180)) + zAxis
      );
    });
    return (
      <group {...props}>
        <Trail
          local
          width={3}
          length={16}
          color={new THREE.Color(color)}
          attenuation={(t) => t * t}
        >
          <mesh ref={ref}>
            <sphereGeometry args={[0.2]} />
            <meshBasicMaterial
              color={color}
              toneMapped={false}
              opacity={1}
              reflectivity
            />
            <directionalLight intensity={2} color={color} />
          </mesh>
        </Trail>
      </group>
    );
  }

  function Atom(props) {
    return (
      <group {...props}>
        <Electron
          position={[0, 0, 0]}
          speed={0.6}
          zAxis={109}
          xAxis={10}
          yAxis={15}
          color={0x40e2a0}
          radius={89}
          variation={Math.random() * 1.9}
          opposite={1}
          //GREEN COLOR
        />
        <Electron
          position={[0, 0, 0]}
          speed={1}
          zAxis={94}
          xAxis={9}
          yAxis={16}
          color={0xff6666}
          radius={6}
          variation={Math.random() * 10 * -1}
          opposite={-1}
          //ORANGE
        />
        <Electron
          position={[0, 0, 0]}
          speed={1}
          zAxis={60}
          xAxis={8}
          yAxis={18}
          color={0x7cb2e8}
          radius={6}
          variation={Math.random() * 3}
          opposite={-1}
          //BLUE COLOR
        />
        <Electron
          position={[0, 0, 0]}
          speed={1}
          zAxis={80}
          xAxis={8}
          yAxis={12}
          color={0xff69f8}
          radius={6}
          variation={Math.random() * -1}
          opposite={1}
          //PINK
        />
      </group>
    );
  }

  function CameraZoom() {
    // This one makes the camera move in and out

    let cameraSpeedPosition = 4;
    let cameraspeedRotation = 0.05;
    useFrame(({ clock, camera }) => {
      camera.position.z = 120;
      camera.rotation.z = 0;
      camera.position.z = 120 - clock.getElapsedTime() * cameraSpeedPosition;
      camera.rotation.z = 0 - clock.getElapsedTime() * cameraspeedRotation;
      if (clock.getElapsedTime() > 7) {
        cameraSpeedPosition += 0.4;
        cameraspeedRotation += 0.003;
        loadingCanvas.current.style = { animation: "fadeOut 0.2s" };
      }
    });
    return null;
  }
  if (isLoading) {
    return (
      <div
        ref={loadingCanvas}
        className={"h-screen bg-black"}
        id="Towers"
        style={{ animation: "fadeIn 0.3s" }}
      >
        <Suspense fallback={<span>loading...</span>}>
          <Canvas>
            <CameraZoom />
            <Towers></Towers>
            <Cloud
              position={[0, 0, -25]}
              speed={0.2}
              opacity={0.5}
              scale={[7, 9, 7]}
              color={new THREE.Color(0x232d61)}
              seed={1}
            />
            <Cloud
              position={[8, 8, -15]}
              speed={0}
              opacity={0.2}
              scale={[8, 9, 7]}
              color={new THREE.Color(0x232d61)}
              seed={1}
            />
            <Cloud
              position={[7, 0, -10]}
              speed={0}
              opacity={0.2}
              scale={[7, 9, 7]}
              color={new THREE.Color(0x000042)}
              seed={1}
            />
            <Cloud
              position={[0, 7, -5]}
              speed={0}
              opacity={0.2}
              scale={[7, 7, 7]}
              color={new THREE.Color(0x000042)}
              seed={1}
            />
            <Cloud
              position={[0, 0, 0]}
              speed={0}
              opacity={0.1}
              scale={[9, 16, 9]}
              color={new THREE.Color(0x4062bb)}
              seed={1}
            />

            <Cloud
              position={[0, 0, 0]}
              speed={0}
              opacity={0.9}
              scale={[16, 16, 26]}
              color={new THREE.Color(0x000000)}
              segments={7}
              seed={1}
            />

            <GlassCubes></GlassCubes>
            <Effects></Effects>
            <fogExp2 attach="fog" color="black" density={0.01} />
            <Atom></Atom>
          </Canvas>
        </Suspense>
      </div>
    );
  } else if (showScreen == "1") {
    return (
      <div className="h-screen bg-black" id="MemoryCard">
        <MemoryCard handleChangeScreen={handleChangeScreen}></MemoryCard>;
      </div>
    );
  } else {
    return <MemoryCard handleChangeScreen={handleChangeScreen}></MemoryCard>;
  }
}

export default App;
