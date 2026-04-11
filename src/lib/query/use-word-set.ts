import { useQuery } from "@tanstack/react-query";
import { WordSet } from "../game/enum";
import { generateWords } from "../game/generate";

export function useWordSet(wordSetName: WordSet) {
	return useQuery({
		queryKey: ["wordset", wordSetName],
		queryFn: () => Promise.resolve(generateWords(wordSetName)),
		staleTime: Infinity,
		refetchOnMount: false,
		retry: false,
	});
}
