"use client";

import React from "react";
import { KeyboardKey } from "./VirtualKeyboard";



const KeyGrid = () => {
  const padding = 4;
  const hort = 24;
  const vert = 14;
  const gridsize = 40;

  const gridwidth = hort * gridsize;
  const gridheight = vert * gridsize;


  return (
    <>
      <div className="absolute left-0 top-0 z-20 h-dvh w-dvw bg-black">
        <p>You need a screen size of at least 1200x720</p>
      </div>
      <div className="relative rounded-lg outline" style={{ width: gridwidth, height: gridheight }}>
        <KeyboardKey className="absolute top-0" />
      </div>
    </>
  );
};

export default KeyGrid;
