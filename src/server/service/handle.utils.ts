import { Filter } from "bad-words";

const filter = new Filter();

const ALLOWED_CHARS = new Set(
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
);

export const validateHandle = (handle: string): string | null => {
	if (handle.length < 3 || handle.length > 15) {
		return "Username must be between 3 and 15 characters long.";
	}

	const hasInvalidChar = [...handle].some((char) => !ALLOWED_CHARS.has(char));
	if (hasInvalidChar) {
		return "Username can only contain letters, numbers, and underscores.";
	}

	// Strip underscores before profanity check to catch bypass attempts like "f_uck"
	const stripped = handle.replace(/_/g, "");
	if (filter.isProfane(stripped)) {
		return "Username contains inappropriate language. >:(";
	}

	return null;
};
