"use client";

import { cn } from "@/utils/utils";
import { MoveLeft, PartyPopper } from "lucide-react";

const VirtualKeyboard = () => {
  const top: string = "qwertyuiop";
  const mid: string = "asdfghjkl";
  const bot: string = "zxcvbnm";

  const imageClass = "size-4";

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-4">
      {/* KEYBOARD */}
      <div className="Keyboard-key-bg flex flex-col gap-4 p-6 text-white/70">
        <div className="flex gap-2 *:grid *:place-items-center">
          {/* top layer*/}
          <AKey className="min-w-16" />
          {top.split("").map((key) => (
            <AKey label={key} key={key} />
          ))}
          <AKey
            className="place-content- min-w-16 justify-end"
            label={<MoveLeft className={imageClass} />}
          />
        </div>
        <div className="flex gap-2 *:grid *:place-items-center">
          {/* middle layer*/}
          <AKey className="min-w-[5.5rem]" label="caps" />
          {mid.split("").map((key) => (
            <AKey label={key} key={key} />
          ))}
          <AKey className="w-full" />
        </div>
        <div className="flex gap-2 *:grid *:place-items-center">
          {/* bottom layer*/}
          <AKey className="min-w-[7rem]" label="shift" />
          {bot.split("").map((key) => (
            <AKey label={key} key={key} />
          ))}
          <AKey label={<PartyPopper className={imageClass} />} />
          <AKey className="w-full" label="shift" />
        </div>
      </div>
    </div>
  );
};

interface KeyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | React.ReactNode;
  className?: string;
}
const AKey = ({ label, ...prop }: KeyProps) => {
  return (
    <button
      {...prop}
      className={cn("Keyboard-key-bg min-h-12 min-w-12 select-none rounded-xl p-2", prop.className)}
    >
      {label}
    </button>
  );
};
export default VirtualKeyboard;
