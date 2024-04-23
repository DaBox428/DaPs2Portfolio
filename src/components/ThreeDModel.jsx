import { React, useState, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useFBX, useProgress } from "@react-three/drei";
import FakeGlowMaterial from "./FakeGlowMaterial";
import { useFrame } from "@react-three/fiber";
function ThreeDModel({
  modelUrl,
  modelPosition,
  modelRotation,
  meshTexture,
  modelScale,
  handleOnClickModal,
  ...props
}) {
  const colorMap = useLoader(TextureLoader, meshTexture);
  let obj = useFBX(modelUrl);
  const model = useRef();
  if (props.repeat) {
    useFrame(({ clock }) => {
      /* model.current.rotation.y = 0 - clock.getElapsedTime() / 3; */
    });

    obj = obj.clone();
  } else {
  }

  const [isHovered, setIsHovered] = useState(false);

  function handleSetIsHoeverd(active) {
    setIsHovered(active);
    document.body.style.cursor = isHovered == true ? "auto" : "pointer";
  }

  return (
    <>
      {isHovered && !props.repeat && (
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

      <mesh ref={model}>
        <primitive
          onClick={() => handleOnClickModal(modelUrl)}
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

export default ThreeDModel;
