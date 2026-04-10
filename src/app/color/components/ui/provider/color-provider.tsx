"use client";

import { random } from "colord";
import { debounce, defaultRateLimit, useQueryState } from "nuqs";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useInsertionEffect,
	useState,
} from "react";
import { ColorAttributeKeys, colorKeys } from "@/lib/color/colorKeys";
import {
	getAllKeys,
	getHsl,
	getHwb,
	getRgb,
	getStyleProperty,
} from "@/lib/color/getAttribute";
import { initColor } from "@/lib/color/initialColor";
import { updateColor } from "@/lib/color/updateColor";

type contextType = {
	mode: "rgb" | "hsl" | "hwb";
	handleMode: (mode: modeType) => void;
	onChange: (attribute: ColorAttributeKeys, value: string) => string;
	setUpdateRef: (ref: handleUpdate) => void;
};

export type modeType = contextType["mode"];

const ColorContext = createContext({} as contextType);

export const useColor = () => {
	const context = useContext(ColorContext);
	if (!context) {
		throw new Error("useColor must be used within a ColorProvider");
	}
	return context;
};

export type handleUpdate = { update: () => void };

export const ColorProvider = ({ children }: { children: ReactNode }) => {
	const [mode, setMode] = useState<modeType>("hsl");
	const [ref, setRef] = useState<handleUpdate>({} as handleUpdate);

	const [searchHex, setHex] = useQueryState(colorKeys.hex, {
		limitUrlUpdates: debounce(200),
	});

	const handleMode = (mode: modeType) => {
		setMode(mode);
	};

	const onChange = (attribute: ColorAttributeKeys, value: string) => {
		document.documentElement.style.setProperty(`--${attribute}`, value);

		if (mode === "rgb")
			updateColor(getRgb(), {
				updateHue: true,
				ignore: ["redness", "greenness", "blueness"],
			});
		if (mode === "hsl")
			updateColor(getHsl(), { ignore: ["hue", "sat", "light"] });
		if (mode === "hwb")
			updateColor(getHwb(), {
				ignore: ["hue", "whiteness", "blackness"],
			});

		const hex = getStyleProperty(colorKeys.hex).slice(1);
		setHex(hex);
		ref.update();

		return value;
	};

	const setUpdateRef = useCallback((ref: handleUpdate) => setRef(ref), []);

	useEffect(() => {
		const hex = getStyleProperty(colorKeys.hex).slice(1);
		// no debouncing
		setHex(hex, { limitUrlUpdates: defaultRateLimit });
	}, []);

	useInsertionEffect(() => {
		if (!document) return;
		// use search params has color,
		// if no search params randomise,
		// use it to set initial color, else randomise it
		const initialHex = searchHex ? `#${searchHex}` : random().toHex();
		const initialAttributes = initColor(initialHex);

		for (const item of getAllKeys()) {
			if (initialAttributes[item] == undefined) continue;
			document.documentElement.style.setProperty(
				`--${item}`,
				`${initialAttributes[item]}`,
			);
		}
	}, []);

	return (
		<ColorContext.Provider
			value={{ mode, onChange, setUpdateRef, handleMode }}
		>
			{children}
		</ColorContext.Provider>
	);
};
