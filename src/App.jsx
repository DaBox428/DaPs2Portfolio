import React, { Suspense, useRef, useState, useEffect } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud } from "@react-three/drei";

import Towers from "./components/Towers.jsx";
import MemoryCard from "./components/MemoryCard.jsx";
import PreLoader from "./components/PreLoader.jsx";
import { Effect } from "postprocessing";

function App() {
  const [count, setCount] = useState(0);

  const [showScreen, setShowScreen] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  function handleChangeScreen(toScreen) {
    setShowScreen(toScreen);
  }

  useEffect(() => {
    const loading = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 999999);
    };
    loading();
  }, []);

  function CameraZoom() {
    // This one makes the camera move in and out
    let cameraSpeedPosition = 4;
    let cameraspeedRotation = 0.05;
    useFrame(({ clock, camera }) => {
      camera.position.z = 110 - clock.getElapsedTime() * cameraSpeedPosition;
      camera.rotation.z = 0 - clock.getElapsedTime() * cameraspeedRotation;
      if (clock.getElapsedTime() > 2.5) {
        cameraSpeedPosition += 0.2;
        cameraspeedRotation += 0.003;
      }
    });
    return null;
  }
  if (isLoading) {
    return (
      <div className="App h-screen bg-black">
        <Canvas>
          <CameraZoom />
          <Towers></Towers>
          <Cloud
            position={[0, 0, -25]}
            speed={0.2}
            opacity={0.8}
            scale={[5, 5, 5]}
          />
          <Cloud
            position={[5, 5, -15]}
            speed={0}
            opacity={0.8}
            scale={[5, 5, 5]}
          />
          <Cloud
            position={[7, 0, -10]}
            speed={0}
            opacity={0.8}
            scale={[5, 5, 5]}
          />
          <Cloud
            position={[0, 7, -5]}
            speed={0}
            opacity={0.8}
            scale={[5, 5, 5]}
          />
          <Cloud
            position={[-7, -7, -7]}
            speed={0}
            opacity={0.75}
            scale={[5, 5, 5]}
          />
        </Canvas>
      </div>
    );
  } else if (showScreen == "1") {
    return (
      <div className="App h-screen bg-black">
        <p className="bg-slate-200">prosioto</p>
      </div>
    );
  } else {
    return <MemoryCard handleChangeScreen={handleChangeScreen}></MemoryCard>;
  }
}

export default App;
