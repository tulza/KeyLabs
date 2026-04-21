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
	display: "swap",
});

export const _ABeeZee = ABeeZee({
	variable: "--font-abeezee",
	weight: ["400"],
	subsets: ["latin"],
	display: "swap",
});

export const _InclusiveSans = Inclusive_Sans({
	variable: "--inclusive-sans",
	subsets: ["latin"],
	display: "swap",
});

export const _Helvetica = localFont({
	src: [
		{
			path: "./Helvetica.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "./Helvetica-Oblique.woff",
			weight: "400",
			style: "italic",
		},
	],
	variable: "--font-helvetica",
	display: "swap",
});
