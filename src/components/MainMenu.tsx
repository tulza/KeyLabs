"use client";

import React, { useState } from "react";
// import Title from "./Title";
import Timer from "./Timer";

function MainMenu() {
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(true);

  function onClick() {
    setDisplayTimer(true);
    setDisplayMenu(false);
  }

  return (
    <>
      {displayTimer && <Timer initialTime={3} />}
      {displayMenu && (
        <div className="w-500 flex flex-col items-center justify-center pt-20">
          <button
            onClick={onClick}
            className="border border-solid border-white p-4 text-white hover:bg-red-950"
          >
            {" "}
            <span className="text-5xl">Start</span>{" "}
          </button>
          <p className="w-80 pt-5 text-center text-xs text-white">
            This game contains flashing lights that may trigger seizures for individuals with
            photosensitive epilepsy or other conditions. If you experience any discomfort,
            dizziness, etc. during the game, please take a break immediately and consult a
            healthcare professional if necessary. Your safety and well-being are important.
          </p>
        </div>
      )}
    </>
  );
}

export default MainMenu;
