"use client";

import { motion, Variants } from "framer-motion";
import React, { useState } from "react";
import useSound from "use-sound";

const flashVariants: Variants = {
  initial: { opacity: 1, scale: 0, width: "0dvw", height: "0dvw", backdropFilter: "blur(4px)" },
  flashing: { scale: 1, width: "100dvw", height: "100dvw" },
};

const flashContainerExit = {
  opacity: [1, 0, 0],
};

const blurContainer: Variants = {
  initial: { scale: 0, width: "0dvw", height: "0dvw" },
  flashing: { scale: 1, width: "100dvw", height: "100dvw" },
};

const Flash = () => {
  const [play] = useSound("/Flash2.mp3");
  play();
  return (
    <motion.div
      className="flashcontainer grid place-items-center"
      initial="initial"
      animate="flashing"
      exit={{ ...flashContainerExit }}
    >
      <motion.div className="flasher rouneded-full" variants={flashVariants} />
    </motion.div>
  );
};

export default Flash;
