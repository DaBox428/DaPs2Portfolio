import { React, forwardRef, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import ThreeDModel from "./ThreeDModel";
import ModelArray from "./ModelArray";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const ModalDialog = forwardRef((props, ref) => {
  let modelUrl = props.modelUrl;

  let selectedModel = ModelArray.find((o) => o.url == modelUrl);

  console.log(selectedModel);

  return (
    <dialog ref={ref} className="backdrop:bg-blue-950/85 bg-slate-500/0">
      <div className="flex flex-row h-96 w-screen justify-stretch">
        <div className="border-red-700 border-2 ">
          {modelUrl && (
            <Canvas className="">
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
        <div className="border-red-700 border-2 ml-2 ">description</div>
      </div>

      <form method="dialog">
        <button>exit icon</button>
      </form>
    </dialog>
  );
});

export default ModalDialog;
