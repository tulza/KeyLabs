import Timer from "@/components/Timer";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import HomePage from "@/components/HomePage/HomePage";
export default function Home() {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center overflow-hidden p-8">
      <Timer initialTime={5} />
      <div>
        <VirtualKeyboard />
      </div>
    </div>
  );
}
