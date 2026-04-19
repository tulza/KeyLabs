import { ABeeZee, Inclusive_Sans } from "next/font/google";
import localFont from "next/font/local";

export const _ABCDiaType = localFont({
	src: [
		{
			path: "./ABCDiatypeVariable-Trial.ttf",
			weight: "400 700",
			style: "normal",
		},
	],
	variable: "--font-abc-diatype",
});

export const _ABeeZee = ABeeZee({
	variable: "--font-abeezee",
	weight: ["400"],
});

export const _InclusiveSans = Inclusive_Sans({
	variable: "--inclusive-sans",
	subsets: ["latin"],
});
