import React from "react";

function MemoryCard({ handleChangeScreen }) {
  return (
    <div
      onClick={() => handleChangeScreen(1)}
      className="flex h-screen bg-slate-500"
    >
      <div className="">memory card</div>
    </div>
  );
}

export default MemoryCard;
