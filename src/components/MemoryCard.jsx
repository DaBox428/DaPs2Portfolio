import { React, useState, Suspense } from "react";
import "../App.css";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { renderToString } from "react-dom/server";
import { Html, useProgress } from "@react-three/drei";
import FakeGlowMaterial from "./FakeGlowMaterial";
import { EffectComposer, Vignette, Bloom } from "@react-three/postprocessing";
import { MTLLoader } from "three/examples/jsm/Addons.js";
import { useFBX } from "@react-three/drei";

const threeDmodelsArray = [
  {
    url: "../catarina/model.fbx",
    mtl: "../catarina/model.mtl",
    position: [0, -5, 0],
    rotation: [-90, 0, 0],
    meshTexture: "../catarina/Binary_0.png",
  },
  {
    url: "../kidbuu/model.fbx",
    mtl: "../kidbuu/model.mtl",
    position: [0, -5, 0],
    rotation: [-90, 0, 0],
    meshTexture: "../kidbuu/Binary_0.png",
  },

  /*  { url: "../untitled.obj", position: [0, -5, -2], rotation: [0, 0, 0] },
  { url: "../catarina.obj", position: [0, -7, 2], rotation: [0, 0, 0] },
  { url: "a", position: [0, -5, -2], rotation: [0, 0, 0] },
  { url: "e", position: [0, -5, -2], rotation: [0, 0, 0] },
  { url: "s", position: [0, -5, -2], rotation: [0, 0, 0] }, */
];

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Model({
  modelUrl,
  MtlUrl,
  modelPosition,
  modelRotation,
  meshTexture,
}) {
  const colorMap = useLoader(TextureLoader, meshTexture);
  const obj = useFBX(modelUrl);

  const [isHovered, setIsHovered] = useState(false);

  function handleSetIsHoeverd(active) {
    setIsHovered(active);
  }

  return (
    <>
      {isHovered && (
        <mesh>
          <sphereGeometry args={[2]} />
          <meshStandardMaterial
            color={0xffffff}
            toneMapped={false}
            opacity={1}
          />
          <FakeGlowMaterial
            falloff={1}
            glowSharpness={0.4}
            glowColor="#588ed5"
          ></FakeGlowMaterial>

          <directionalLight intensity={2} color={0x7cb2e8} />
        </mesh>
      )}
      <mesh>
        <primitive
          onPointerOver={() => handleSetIsHoeverd(true)}
          onPointerOut={() => handleSetIsHoeverd(false)}
          object={obj}
          scale={5}
          rotation={modelRotation}
          position={modelPosition}
        />
        <meshBasicMaterial map={colorMap} attach="BUK_avt" />
      </mesh>
    </>
  );
}
function MemoryCard({ handleChangeScreen }) {
  return (
    <div
      className={`flex  h-screen w-screen bg-gradient-to-br from-slate-200 to-black-900 
      }`}
      style={{ animation: "fadeIn 5s" }}
    >
      <div className="m-auto ml-52 mr-52">
        <div className="flex  flex-wrap">
          {threeDmodelsArray.map((item) => {
            return (
              <div key={item.url} className="border border-slate-700">
                <Canvas>
                  <Suspense fallback={<Loader />}>
                    <OrbitControls></OrbitControls>
                    <ambientLight intensity={1} />
                    <Environment preset="studio" />

                    <Model
                      modelUrl={item.url}
                      modelPosition={item.position}
                      modelRotation={item.rotation}
                      MtlUrl={item.mtl}
                      meshTexture={item.meshTexture}
                    />
                  </Suspense>
                </Canvas>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;
