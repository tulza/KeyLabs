
import Timer from "@/components/Timer";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import Title from "@/components/Title";
import Flash from "@/components/Flash";

// cloudflare
export const runtime = "edge";

export default function Home() {
  return (
    <div className="w-dvw h-dvh overflow-hidden">
      <Title></Title>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <Timer initialTime={5}/>
        <VirtualKeyboard/>
      </div>
    </div>  
  );
}
