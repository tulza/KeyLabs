
import Timer from "@/components/Timer";
import Title from "@/components/Title";
import VirtualKeyboard from "@/components/VirtualKeyboard";

export default function Home() {
  return (
    <>
    <Title></Title>
    <div className="flex h-dvh w-dvw items-center justify-center">
      <Timer initialTime={5}/>
      <VirtualKeyboard/>
    </div>
    </>
  );
}
