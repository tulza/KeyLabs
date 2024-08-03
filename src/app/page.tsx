import Timer from "@/components/Timer";
import VirtualKeyboard, { KeyboardKey } from "@/components/VirtualKeyboard";
import HomePage from "@/components/HomePage/HomePage";
import Link from "next/link";
import KeyGrid from "@/components/KeyGrid";
import Title from "@/components/Title";

export default function Home() {
  return (
    <>
      <div className="flex h-dvh w-dvw flex-col items-left justify-left overflow-hidden p-8">
        <div className="absolute top-2 whitespace-nowrap">
          <Timer initialTime={5} />
        </div>
        <div>
          <Title></Title>
        </div>

        {/* <KeyGrid /> */}
      </div>
    </>
  );
}
