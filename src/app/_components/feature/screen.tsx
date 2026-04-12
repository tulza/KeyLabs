import { MouseEvent, PropsWithChildren, useRef } from "react";
import { screenConfig } from "@/lib/game/config";
import { usePointActions } from "@/lib/game/store/point";

export const Screen = ({ children }: PropsWithChildren) => {
	const screenRef = useRef<HTMLDivElement>(null);

	const { handleClick: checkClickLocation } = usePointActions();

	const BORDER = 2;

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		if (!screenRef.current) return;
		const { clientX, clientY } = e;
		const { left, top } = screenRef.current.getBoundingClientRect();

		const clickX = clientX - left - BORDER;
		const clickY = clientY - top - BORDER;

		checkClickLocation(clickX, clickY);
	};

	return (
		<div
			ref={screenRef}
			onMouseDown={handleClick}
			className="relative rounded-md border-2 border-border bg-muted"
			style={{
				width: screenConfig.width,
				height: screenConfig.height,
				minWidth: screenConfig.width,
				minHeight: screenConfig.height,
			}}
		>
			<div className="grid-100 absolute top-0 left-0 size-full bg-center bg-secondary object-center" />
			{/* <StartCircle /> */}
			{children}
		</div>
	);
};
