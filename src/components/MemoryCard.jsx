import { React, useState } from "react";
import "../App.css";

import { useLoader, useGraph } from "@react-three/fiber";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

import FakeGlowMaterial from "./FakeGlowMaterial";
import { EffectComposer, Vignette, Bloom } from "@react-three/postprocessing";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

import Buu from "../assets/Buu.jsx";
import { Hominid } from "../assets/Hominid.jsx";
const modelQuantity = 2;
function Model({ modelUrl, scale, mtlURL, modelPosition, modelRotation }) {
  const materials = useLoader(MTLLoader, mtlURL);
  const obj = useLoader(OBJLoader, modelUrl);

  const { nodes, materiales } = useGraph(obj);
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
      <mesh geometry={nodes.BUK_avt.geometry}></mesh>
      {/* <primitive
        onPointerOver={() => handleSetIsHoeverd(true)}
        onPointerOut={() => handleSetIsHoeverd(false)}
        object={obj}
        scale={scale}
        rotation={modelRotation}
        position={modelPosition}
      /> */}
    </>
  );
}
function MemoryCard({ handleChangeScreen }) {
  return (
    <div className="bg-black">
      <div
        className={`flex overflow-y-auto h-screen w-screen bg-gradient-to-br from-slate-100 to-black
      }`}
        style={{ animation: "fadeIn 5s" }}
      >
        <div className="m-auto ">
          <div className="flex  flex-wrap">
            <div className="border border-slate-700 h-screen w-screen">
              <div className="flex  flex-wrap ml-28">
                {[...Array(modelQuantity)].map((x, i) => (
                  <div className="border border-slate-700">
                    <Canvas camera={{ fov: 17 }}>
                      {/* <OrbitControls /> */}
                      <ambientLight intensity={1} />
                      <Environment preset="studio"></Environment>

                      <Buu
                        scale={0.002}
                        rotation={[90, 0, 0]}
                        position={[-0.2, 0.1, 0]}
                      />
                    </Canvas>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;
