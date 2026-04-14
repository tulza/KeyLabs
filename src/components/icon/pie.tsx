import { SVGProps, useEffect, useRef } from "react";

type PieTimerProps = {
	duration: number;
	startTime?: number;
} & SVGProps<SVGSVGElement>;

export const PieTimer = ({ duration, startTime, ...props }: PieTimerProps) => {
	const rafRef = useRef<number>(0);
	const pieRef = useRef<SVGCircleElement>(null);
	const labelRef = useRef<HTMLSpanElement>(null);
	const totalMs = duration * 1000;

	useEffect(() => {
		const update = () => {
			const elapsed = startTime
				? Math.min(Date.now() - startTime, totalMs)
				: 0;

			const progress = elapsed / totalMs;
			const remaining = (totalMs - elapsed) / 1000;

			if (pieRef.current)
				pieRef.current.setAttribute(
					"stroke-dasharray",
					`${progress} 1`,
				);

			if (labelRef.current)
				labelRef.current.innerText = `${remaining.toFixed(2)}s`;

			rafRef.current = requestAnimationFrame(update);
		};

		rafRef.current = requestAnimationFrame(update);
		return () => cancelAnimationFrame(rafRef.current);
	}, [startTime, totalMs]);

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				{...props}
			>
				<circle
					r="10"
					cx="12"
					cy="12"
					fill="#453D3D"
					className="fill-foreground"
				/>
				<circle
					ref={pieRef}
					r="5"
					cx="12"
					cy="12"
					fill="transparent"
					strokeWidth="10"
					pathLength={1}
					strokeDasharray="0 1"
					className="-rotate-90 origin-center stroke-muted"
				/>
			</svg>
			<span
				ref={labelRef}
				className="w-full min-w-0 text-left font-sans text-foreground slashed-zero tabular-nums"
				style={{ direction: "rtl" }}
			>
				15.00s
			</span>
		</>
	);
};
