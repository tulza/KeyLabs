import Image from "next/image";
import { img } from "@/assets";

export const Background = () => {
	return (
		<>
			<Image
				className="-z-10 pointer-events-none absolute top-0 left-0 size-[150%] w-full object-cover object-bottom mix-blend-darken"
				src={img.background}
				alt="background"
				height={1600}
			/>
		</>
	);
};
