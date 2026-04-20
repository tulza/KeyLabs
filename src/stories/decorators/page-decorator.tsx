import { Canvas } from "@react-three/fiber";
import { BrowserRouter, Route, Routes } from "react-router";
import { DecoratorFunction } from "storybook/internal/types";

export const canvasWrapper: DecoratorFunction = (Story) => (
	<Canvas dpr={1}>
		<Story />
	</Canvas>
);

export const browserWrapper: DecoratorFunction = (Story) => (
	<BrowserRouter>
		<Routes>
			<Route path="*" element={<Story />} />
		</Routes>
	</BrowserRouter>
);
