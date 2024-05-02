import { React, forwardRef, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useProgress } from "@react-three/drei";
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

  return (
    <dialog
      ref={ref}
      className="sm:ml-40 ml-0 backdrop:bg-blue-950/95 bg-slate-500/0 max-h-screen max-w-screen overflow-x-hidden my-10 sm:my-auto sm:overflow-hidden open:animate-modalf"
    >
      {modelUrl && (
        <div className="flex flex-col sm:flex-row w-screen max-h-screen items-center 2xl:justify-center ">
          <div className=" sm:w-40 sm:h-40 md:w-60 md:h-60 xl:w-80 xl:h-80 2xl:w-150 2xl:h-150">
            <Canvas camera={{ fov: 70, position: [0, 0, 200] }}>
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
          </div>
          <div className="2xl:pl-28 pl-1 flex 2xl:max-w-4xl max-w-2xl flex-wrap ">
            <div className="flex-col">
              <h1 className="text-white lg:text-3xl text-xl font-extrabold font-sans font-outline-2 tracking-[.11em] text-center p-1">
                Memory Card (ps2)/1
              </h1>
              <h2
                className="text-yellow-400 lg:text-4xl text-3xl font-extrabold font-sans text-wrap
               font-outline-2 tracking-[.11em] text-center p-2 sm:m-auto m-3"
              >
                {selectedModel.title}
              </h2>

              <p className="text-white 2xl:text-3xl xl:text-xl font-bold font-sans font-outline-1 tracking-[.11em] text-center pt-3 mx-12 2xl:mx-0">
                {selectedModel.description}

                <br />
                <a
                  target="_blank"
                  className="text-white md:text-xl text-lg font-thin italic font-sans font-outline-1 tracking-[.11em] text-center pt-3 underline"
                  href={selectedModel.link}
                >
                  {selectedModel.link}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="py-8 xl:mx-64 mx-0 justify-center items-center text-white md:text-2xl text-md font-extrabold font-sans font-outline-2 tracking-[.11em] ">
        <form method="dialog">
          <div
            className="flex flex-row justify-center items-center sm:mt-0 mt-2 mx-20 my-10 sm:my-0"
            onClick={() => props.handleOnClickModal(false)}
          >
            <img src={circleImage} className="sm:max-w-14 max-w-8" />
            <button className="px-3 sm:text-xl text-2xl">Back</button>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default ModalDialog;
