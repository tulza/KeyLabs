"use client";

import HomePage from "@/components/HomePage/HomePage";
import { KeyGrid } from "@/components/KeyGrid";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function kgrid() {
  const isMinWidth = useMediaQuery("(min-width:1000px)");
  const isMinHeight = useMediaQuery("(min-width:768px)");

    if (!isMinWidth || !isMinHeight) {
      return (
        <div className="absolute left-0 top-0 z-20 z-50 h-dvh w-dvw bg-black">
          <p>You need a screen size of at least 1200x720</p>
        </div>
      );
    }
  return (
    <div className="h-100dvh w-100dvw relative overflow-hidden">
      <KeyGrid />
    </div>
  );
}
