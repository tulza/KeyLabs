import Timer from "@/components/Timer";
import VirtualKeyboard, { KeyboardKey } from "@/components/VirtualKeyboard";
import HomePage from "@/components/HomePage/HomePage";
import Link from "next/link";
import KeyGrid from "@/components/KeyGrid";

export default function Home() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center overflow-hidden p-8">
      <div className="absolute top-2 whitespace-nowrap">
        <Timer initialTime={5} />
      </div>
      <KeyGrid />
    </div>
  );
}
