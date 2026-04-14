import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const getThemeCookie = createServerFn().handler(() => {
	return getCookie("theme") ?? "default";
});
