import React from "react";
import "../App.css";

function MemoryCard({ handleChangeScreen }) {
  return (
    <div
      className={`flex  h-screen bg-gradient-to-br from-slate-200 to-black-900
      }`}
      style={{ animation: "fadeIn 5s" }}
    >
      <h1 className="m-auto font-sans text-2xl font-bold">
        Estados unidos es un pais?
      </h1>
    </div>
  );
}

export default MemoryCard;
