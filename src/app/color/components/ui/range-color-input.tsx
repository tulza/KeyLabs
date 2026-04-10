"use client";

import {
	forwardRef,
	InputHTMLAttributes,
	PropsWithChildren,
	RefObject,
	useCallback,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from "react";
import { ColorAttributeKeys } from "@/lib/color/colorKeys";
import { getStyleProperty } from "@/lib/color/getAttribute";
import { cn } from "@/lib/utils";
import { useColor } from "./provider/color-provider";

interface RangeInputProps extends InputHTMLAttributes<HTMLDivElement> {
	min: number;
	max: number;
	label: string;
	peerUpdate?: RefObject<UpdateHandle | null>[];
	attribute: ColorAttributeKeys;
}

export type UpdateHandle = {
	update: () => void;
};

export const RangeColorInput = forwardRef<UpdateHandle, RangeInputProps>(
	({ label, attribute, peerUpdate, ...props }, ref) => {
		const { onChange } = useColor();

		const inputRef = useRef<HTMLInputElement>(null);
		const displayRef = useRef<HTMLInputElement>(null);

		const updateDisplay = useCallback(() => {
			const value = getStyleProperty(attribute);

			if (!inputRef.current || !displayRef.current) return;

			inputRef.current.value = value;
			displayRef.current.value = value;
		}, [attribute]);

		useLayoutEffect(() => {
			updateDisplay();
		}, [updateDisplay]);

		useImperativeHandle(ref, () => {
			return {
				update: updateDisplay,
			};
		}, [updateDisplay]);

		const updateValue = (value: string) => {
			if (!inputRef.current || !displayRef.current) return;

			const parseValue = Number.parseFloat(value);

			if (Number.isNaN(parseValue))
				return onChange(attribute, props.min.toString());
			else if (parseValue < props.min)
				return onChange(attribute, props.min.toString());
			else if (parseValue > props.max)
				return onChange(attribute, props.max.toString());

			inputRef.current.value = value;
			displayRef.current.value = value;
			onChange(attribute, value);

			for (const peer of peerUpdate || []) {
				if (peer.current) peer.current.update();
			}
		};

		const onRangeChange = () => {
			const value = inputRef.current!.value;
			updateValue(value);
		};

		const onNumberChange = () => {
			const value = displayRef.current!.value;
			if (!value) return updateValue(props.min!.toString());
			updateValue(value);
		};

		return (
			<div className="flex rounded bg-zinc-200">
				<Container>
					<p>{label.slice(0, 1)}</p>
				</Container>
				{/* <div className="no-background -z-50 size-full" /> */}
				<div className="relative flex size-full items-center justify-center px-1">
					<div className="relative flex w-full">
						<input
							{...props}
							ref={inputRef}
							type="range"
							className={cn(
								"z-20 flex h-6 w-full appearance-none items-center justify-center rounded-xs",
								props.className,
							)}
							onChange={onRangeChange}
						/>
						<div className="no-background absolute inset-0 z-10 size-full rounded-xs" />
					</div>
				</div>
				<Container>
					<input
						className="flex size-full w-full items-center justify-center pl-1 text-xs"
						type="number"
						min={props.min}
						max={360}
						ref={displayRef}
						onChange={onNumberChange}
					/>
				</Container>
			</div>
		);
	},
);

const Container = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex aspect-square min-w-10 items-center justify-between p-1 font-medium">
			<div className="flex size-full items-center justify-center rounded-xs bg-zinc-300">
				{children}
			</div>
		</div>
	);
};

RangeColorInput.displayName = "RangeColorInput";
