import { SVGProps, useEffect, useRef } from "react";

export const PieTimer = ({
	duration,
	...props
}: { duration: number } & SVGProps<SVGSVGElement>) => {
	const startTime = useRef<number>(null);
	const pieRef = useRef<SVGCircleElement>(null);

	const milis = duration * 1000;

	const defaultDashArrayState = "0 1";

	const setProgress = (p: number) => {
		if (!pieRef.current) return;

		const angle = `${p} 1`;
		pieRef.current.setAttribute("stroke-dasharray", angle);
	};

	const update = () => {
		if (pieRef.current && startTime.current) {
			const currentTime = Date.now();
			const normalisedRotation =
				(currentTime - startTime.current) / milis;

			setProgress(normalisedRotation);
		} else {
			setProgress(0);
		}
	};

	const start = () => {
		startTime.current = Date.now();
		setInterval(update, 100);
	};

	useEffect(() => {
		start();
	}, []);

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
			<circle r="10" cx="12" cy="12" className="fill-secondary" />
			<circle
				ref={pieRef}
				className="-rotate-90 origin-center"
				r="5"
				cx="12"
				cy="12"
				fill="transparent"
				stroke="#453D3D"
				strokeWidth="10"
				pathLength={1}
				strokeDasharray={defaultDashArrayState}
			/>
		</svg>
	);
};
