import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { cn } from "./utils";

export type FontsRecord = Record<
	"variables" | "classNames",
	NextFontWithVariable[]
>;

export const fontLoader = (record: FontsRecord) => {
	const variables = record.variables.map((f) => f.variable);
	const classNames = record.classNames.map((f) => f.className);

	const fontClassName = cn(variables, classNames);

	return fontClassName;
};
