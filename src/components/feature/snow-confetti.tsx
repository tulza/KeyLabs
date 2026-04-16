import confetti, { CreateTypes } from "canvas-confetti";
import { useEffect, useRef } from "react";

export type ConfettiProps = {
	/** fire once on mount */
	autoFire?: boolean;
};

let confettiInstance: CreateTypes | null = null;

export const setConfettiInstance = (instance: CreateTypes) => {
	confettiInstance = instance;
};

const snowConfig: confetti.Options = {
	particleCount: 1,

	angle: 90,
	spread: 360,

	startVelocity: 2, // much slower
	gravity: 0.2, // floaty fall
	drift: (Math.random() - 0.5) * 0.5, // subtle side movement

	ticks: 300, // shorter but more natural
	decay: 0.98, // slower fade

	scalar: Math.random() * 0.6 + 0.4, // size variation

	colors: ["#ffffff", "#f0f8ff"], // softer whites
	shapes: ["circle"],

	origin: {
		x: Math.random(),
		y: -0.1,
	},
};

export const shootConfetti = () => {
	confettiInstance?.(snowConfig);
};

export function Confetti({ autoFire = false }: ConfettiProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const instanceRef = useRef<CreateTypes | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		// create scoped confetti instance tied to this canvas
		instanceRef.current = confetti.create(canvasRef.current, {
			resize: true,
			useWorker: true,
		});

		if (autoFire) {
			snow();
		}

		return () => {
			// cleanup (important for React strict mode)
			instanceRef.current?.reset();
			instanceRef.current = null;
		};
	}, [autoFire]);

	useEffect(() => {
		if (!canvasRef.current) return;

		const instance = confetti.create(canvasRef.current, {
			resize: true,
			useWorker: true,
		});

		instanceRef.current = instance;
		setConfettiInstance(instance);

		return () => instance.reset();
	}, []);

	const snow = (duration = 3000) => {
		const end = Date.now() + duration;

		(function frame() {
			if (!instanceRef.current) return;

			instanceRef.current(snowConfig);

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	};

	// You can expose these via ref, context, or store if needed

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				pointerEvents: "none",
				width: "100%",
				height: "100%",
				top: 0,
				left: 0,
				zIndex: 9999,
			}}
		/>
	);
}
