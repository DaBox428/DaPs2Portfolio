import { React, useState, Suspense, forwardRef, useRef } from "react";
import "../App.css";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { Html, useProgress } from "@react-three/drei";

import ps2CardImage from "../assets/PS2_Memory_Card.png";

import ModalDialog from "./ModalDialog";

import ThreeDModel from "./ThreeDModel";

import ModelArray from "./ModelArray";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className=" text-yellow-400">
      {progress} % loaded
    </Html>
  );
}

function MemoryCard() {
  const dialogRef = useRef(null);

  const [selectedModelUrl, setSelectedModelUrl] = useState("");

  function handleOnClickModal(modelUrl) {
    setSelectedModelUrl(modelUrl);
    if (!dialogRef.current) {

      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <div
      className={`flex h-screen w-screen max-h-screen max-w-screen bg-gradient-to-br from-slate-300 to-black 
      }`}
      style={{ animation: "fadeIn 5s" }}
    >
      <div className="md:mt-16 md:ml-20 absolute flex ml-auto mt-7">
        <img src={ps2CardImage} className=" mt-0 m-7 max-w-14" />
        <h1 className=" text-white md:text-3xl text-md font-extrabold font-sans font-outline-2 tracking-[.11em] text-left  align-text-bottom">
          Memory Card (ps2)/1 <br />
          428 KB free
        </h1>
      </div>

      <div className="mt-16 ml-20 absolute flex right-20">
        <h1 className=" text-yellow-400 text-3xl font-extrabold font-sans font-outline-2 tracking-[.11em] invisible md:visible">
          Your System <br /> Configuration
        </h1>
      </div>

      <ModalDialog
        ref={dialogRef}
        modelUrl={selectedModelUrl}
        handleOnClickModal={handleOnClickModal}
      />
      <div className="flex justify-center items-center w-screen">
        <div className="flex  flex-wrap">
          {ModelArray.map((item) => {
            return (
              <div
                key={Math.random(1, 100)}
                /*   className="border border-slate-700" */
                className=" min-h-80 min-w-80"
              >
              <Canvas camera={{ fov: 50, position: [0, 0, 350] }}>
                  <Suspense fallback={<Loader />}>
                    {/* <OrbitControls></OrbitControls> */}
                    <ambientLight intensity={1.5} />
                    <Environment preset="studio" />

                    <ThreeDModel
                      modelUrl={item.url}
                      modelPosition={item.position}
                      modelRotation={item.rotation}
                      meshTexture={item.meshTexture}
                      modelScale={item.modelScale}

                      handleOnClickModal={handleOnClickModal}
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
