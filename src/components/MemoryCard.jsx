import { React, useState, Suspense } from "react";
import "../App.css";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import { useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { Html, useProgress } from "@react-three/drei";
import FakeGlowMaterial from "./FakeGlowMaterial";

import { useFBX } from "@react-three/drei";

const threeDmodelsArray = [
  {
    url: "../hominid/model.fbx",

    position: [0, -0.2, 1],
    rotation: [2, 0, 0],
    scale: 3,
    meshTexture: "../hominid/Binary_0.png",
  },
  {
    url: "../kidbuu/model.fbx",

    position: [-0, -30, -90],
    rotation: [3, 0, 0],
    modelScale: 0.6,
    meshTexture: "../kidbuu/Binary_0.png",
  },
  {
    url: "../catarina/model.fbx",

    position: [-0, -0, 10],
    rotation: [0, 0, 0],
    modelScale: 5,
    meshTexture: "../catarina/tex.png",
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
  modelPosition,
  modelRotation,
  meshTexture,
  modelScale,
  handleOnClickModal,
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
          onClick={handleOnClickModal}
          onPointerOver={() => handleSetIsHoeverd(true)}
          onPointerOut={() => handleSetIsHoeverd(false)}
          object={obj}
          scale={modelScale}
          rotation={modelRotation}
          position={modelPosition}
        />
        <meshBasicMaterial map={colorMap} attach="BUK_avt" />
      </mesh>
    </>
  );
}

function MemoryCard() {
  const [showDialog, setShowDialog] = useState(false);

  function handleOnClickModal() {
    console.log("clicked model");
  }

  function ShowModelDialog({}) {
    console.log("setting, ", showDialog);
    return (
      <dialog open>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
    );
  }

  return (
    <div
      className={`flex h-screen w-screen bg-gradient-to-br from-slate-300 to-black-900 
      }`}
      style={{ animation: "fadeIn 5s" }}
    >
      <div className="mt-16 ml-20 absolute flex ">
        <div className="bg-slate-500 m-7">insert memory card image here</div>
        <h1 className=" text-white text-3xl font-extrabold font-sans font-outline-2 tracking-[.11em]">
          Memory Card (ps2)/1 <br />
          428 KB free
        </h1>
      </div>

      <ShowModelDialog />
      <div className="flex m-auto">
        <div className="flex  flex-wrap">
          {threeDmodelsArray.map((item) => {
            return (
              <div
                key={Math.random(1, 100)}
                /*   className="border border-slate-700" */
                className="border border-slate-700 min-h-80 min-w-80"
              >
                <Canvas /* camera={{ fov: 70, position: [0, 0, 0] }} */>
                  <Suspense fallback={<Loader />}>
                    {/* <OrbitControls></OrbitControls> */}
                    <ambientLight intensity={1} />
                    <Environment preset="studio" />

                    <Model
                      modelUrl={item.url}
                      modelPosition={item.position}
                      modelRotation={item.rotation}
                      meshTexture={item.meshTexture}
                      modelScale={item.modelScale}
                      handleOnClickModal={() => handleOnClickModal()}
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
