
import Timer from "@/components/Timer";
import VirtualKeyboard from "@/components/VirtualKeyboard";
import Title from "@/components/Title";

export default function Home() {
  return (
    <div>
      <Title></Title>
      <div className="flex h-dvh w-dvw items-center justify-center">
        <Timer initialTime={5}/>
        <VirtualKeyboard/>
      </div>
    </div>  
  );
}
