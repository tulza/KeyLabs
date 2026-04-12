import { type ClassValue, clsx } from "clsx";
import html2canvas from "html2canvas";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const copyElementToClipboard = async (
	el: HTMLElement,
): Promise<void> => {
	try {
		// Wait for all fonts to be ready before capturing
		await document.fonts.ready;

		const canvas = await html2canvas(el, {
			useCORS: true,
			scale: 2,
		});

		canvas.toBlob(async (blob) => {
			if (!blob) return;
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": blob }),
			]);
		}, "image/png");
	} catch (err) {
		console.error("Failed to copy element:", err);
	}
};

export const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
