import {
	EB_Garamond,
	Geist,
	Geist_Mono,
	IBM_Plex_Mono,
	Inter,
	Monomaniac_One,
	Tiny5,
} from "next/font/google";
import localFont from "next/font/local";
import { FontsRecord } from "./fontLoader";

export const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const ebGaramond = EB_Garamond({
	variable: "--font-eb-garamond",
	weight: ["400", "500"],
	style: ["normal", "italic"],
	subsets: ["latin"],
});

export const monomaniac = Monomaniac_One({
	variable: "--font-monomaniac",
	weight: "400",
});

export const helvetica = localFont({
	src: [
		{
			path: "./fonts/Helvetica.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/Helvetica-Oblique.woff",
			weight: "400",
			style: "italic",
		},
	],
	variable: "--font-helvetica",
});

export const ABCDiaType = localFont({
	src: [
		{
			path: "./fonts/ABCDiatypeVariable-Trial.ttf",
			weight: "400 700",
			style: "normal",
		},
	],
	variable: "--font-abcdia-type",
});

export const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const tiny5 = Tiny5({
	variable: "--font-tiny5",
	weight: "400",
	subsets: ["latin"],
});

export const ibmPlexMono = IBM_Plex_Mono({
	variable: "--font-ibm-plex-mono",
	weight: ["400", "500"],
	subsets: ["latin"],
});

export const inter = Inter({
	variable: "--font-inter",
	weight: ["400", "500"],
	subsets: ["latin"],
});

export const loadedFonts: FontsRecord = {
	variables: [geistMono, ebGaramond, inter],
	classNames: [ABCDiaType],
} as const;
