import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faEject } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function PreLoader({ onClick }) {
  const [changeIconAnim, setchangeIconAnim] = useState(false);

  const [fadeOut, setfadeOut] = useState(false);

  const divRef = useRef();
  function handleAnimation() {
    /* setchangeIconAnim(true); */
    setfadeOut(true);

    setTimeout(() => {
      onClick();
    }, 1000 /* 9000 */);
  }

  return (
    <div
      ref={divRef}
      className={`bg-black h-screen w-screen overflow-hidden 
        transition-all duration-700    ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
      <div
        className="flex  flex-col min-h-screen min-w-screen justify-center items-center overflow-y-hidden"
        onClick={handleAnimation}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={faCompactDisc}
          size="7x"
          style={{ color: "#FFFFFF", cursor: "pointer" }}
          spin={!changeIconAnim}
          beat={changeIconAnim}
        />
        <p className="m-4 text-sky-800 text-2xl font-extrabold font-sans">
          Insert Disk
        </p>
      </div>
    </div>
  );
}

export default PreLoader;
