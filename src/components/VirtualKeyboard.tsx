"use client";

import { cn } from "@/utils/utils";
import { MoveLeft, PartyPopper } from "lucide-react";
import React, { forwardRef, MouseEventHandler, useState } from "react";

type capsContext = true | false;
const CapsContext = React.createContext<capsContext>({} as capsContext);

const VirtualKeyboard = () => {
  const top: string = "qwertyuiop";
  const mid: string = "asdfghjkl";
  const bot: string = "zxcvbnm";

  const [isCapsLock, setIsCapsLock] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const imageClass = "size-4";
  const isUpperCase = isShift != isCapsLock;

  const handleClick = (key: string) => {
    let keyPressed = key;
    if (isCapsLock !== isShift) {
      keyPressed = key.toUpperCase();
    }
    console.log(isShift, isCapsLock);
    if (isShift) {
      setIsShift(false);
    }
  };

  const handleShift = () => {
    setIsShift((isShift) => !isShift);
  };

  const handleCapsLock = () => {
    setIsCapsLock((isCaps) => !isCaps);
  };

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-4">
      {/* KEYBOARD */}
      <div
        className={cn(
          "Keyboard-key-bg flex flex-col gap-4 p-6 text-white/70",
          isUpperCase && "*:*:uppercase"
        )}
      >
        <div className="flex gap-2 *:grid *:place-items-center">
          {/* top layer*/}
          <KeyboardKey className="min-w-16" />
          {top.split("").map((key) => (
            <KeyboardKey label={key} key={key} onMouseDown={() => handleClick(key)} />
          ))}
          <KeyboardKey
            className="place-content- min-w-16 justify-end"
            label={<MoveLeft className={imageClass} />}
          />
        </div>
        <div className="flex gap-2 *:grid *:place-items-center">
          {/* middle layer*/}
          <KeyboardKey className="min-w-[5.5rem]" onMouseDown={handleCapsLock} label="caps" />
          {mid.split("").map((key) => (
            <KeyboardKey label={key} key={key} onMouseDown={() => handleClick(key)} />
          ))}
          <KeyboardKey className="w-full" />
        </div>
        <div className="flex gap-2 *:grid *:place-items-center">
          {/* bottom layer*/}
          <KeyboardKey className="min-w-[7rem]" label="shift" onMouseDown={handleShift} />
          {bot.split("").map((key) => (
            <KeyboardKey label={key} key={key} onMouseDown={() => handleClick(key)} />
          ))}
          <KeyboardKey label={<PartyPopper className={imageClass} />} />
          <KeyboardKey className="w-full" label="shift" onMouseDown={handleShift} />
        </div>
      </div>
    </div>
  );
};

interface KeyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | React.ReactNode;
  className?: string;
  out?: string;
}

export const KeyboardKey = forwardRef<HTMLButtonElement, KeyProps>(
  ({ label, out, ...props }, fref) => {
    return (
      <button
        {...props}
        ref={fref}
        className={cn(
          "Keyboard-key-bg min-h-12 min-w-12 select-none rounded-xl p-2",
          props.className
        )}
        onMouseDown={props.onMouseDown}
      >
        {label}
      </button>
    );
  }
);
export default VirtualKeyboard;
