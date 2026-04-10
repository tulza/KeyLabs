import { useQueryState } from "nuqs";
import { useRef } from "react";

export function useQueryParams() {
	const timerRef = useRef<number | null>(null);

	const setQueryString = async (name: string, value: string) => {
		const [, setValue] = useQueryState(name);
		await setValue(value);
	};

	const setQueryStringDebounced = (name: string, value: string) => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			setQueryString(name, value);
			timerRef.current = null;
		}, 200);
	};

	return { setQueryString, setQueryStringDebounced };
}
