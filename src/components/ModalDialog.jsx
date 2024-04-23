import { React, forwardRef, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import ThreeDModel from "./ThreeDModel";
import ModelArray from "./ModelArray";
import circleImage from "../assets/circle.png";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const ModalDialog = forwardRef((props, ref) => {
  let modelUrl = props.modelUrl;

  let selectedModel = ModelArray.find((o) => o.url == modelUrl);

  console.log(selectedModel);

  return (
    <dialog
      ref={ref}
      className="ml-40 backdrop:bg-blue-950/85 bg-slate-500/0 max-h-screen max-w-screen overflow-hidden min-w-screen"
    >
      <div className="flex flex-row w-screen max-h-screen justify-center items-center ">
        <div className="border w-96 h-96 ">
          {modelUrl && (
            <Canvas>
              <Suspense fallback={<Loader />}>
                {/* <OrbitControls></OrbitControls> */}
                <ambientLight intensity={1} />
                <Environment preset="studio" />

                <ThreeDModel
                  modelUrl={selectedModel.url}
                  modelPosition={selectedModel.position}
                  modelRotation={selectedModel.rotation}
                  meshTexture={selectedModel.meshTexture}
                  modelScale={selectedModel.modelScale}
                  handleOnClickModal={null}
                  repeat={true}
                />
              </Suspense>
            </Canvas>
          )}
        </div>
        <div className=" pl-28 flex max-w-4xl">
          <div className="flex-col">
            <h1 className="text-white md:text-2xl text-md font-extrabold font-sans font-outline-2 tracking-[.11em] text-center p-1">
              Memory Card (ps2)/1
            </h1>
            <h2 className="text-yellow-400 text-3xl font-extrabold font-sans font-outline-2 tracking-[.11em] text-center p-2">
              Kid buu 3d model
            </h2>

            <p className="text-white md:text-2xl text-md font-bold font-sans font-outline-2 tracking-[.11em] text-center pt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
      <div className="py-8 mx-64 justify-center items-center text-white md:text-2xl text-md font-extrabold font-sans font-outline-2 tracking-[.11em] ">
        <form method="dialog">
          <div className="flex flex-row justify-center items-center">
            <img src={circleImage} className="max-w-14" />
            <button className="px-3">Back</button>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default ModalDialog;
