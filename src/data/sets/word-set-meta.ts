import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { WordSetData } from "@/lib/game/types";
import { max, mean, median, mode } from "@/lib/stats";

const wordsetDir = path.join(process.cwd(), "src/data/sets");
const metaDir = path.join(process.cwd(), "src/data/meta");

export type WordSetMeta = {
	name: string;
	description: string | undefined;
	length: number;
	letterCount: {
		median: number;
		mean: number;
		mode: number;
		max: number;
	};
};

const parseWordSetMeta = (data: WordSetData): WordSetMeta => {
	const lengths = data.words.map((word) => word.length);
	return {
		name: data.name,
		description: data.description,
		length: data.words.length,
		letterCount: {
			mean: mean(lengths),
			median: median(lengths),
			mode: mode(lengths),
			max: max(lengths),
		},
	};
};

export const generateMetaFiles = async (): Promise<void> => {
	const files = await readdir(wordsetDir);
	const jsonFiles = files.filter((file) => file.endsWith(".json"));

	await Promise.all(
		jsonFiles.map(async (file) => {
			const raw = await readFile(path.join(wordsetDir, file), "utf-8");
			const data = JSON.parse(raw) as WordSetData;
			const meta = parseWordSetMeta(data);
			await writeFile(
				path.join(metaDir, file),
				JSON.stringify(meta, null, 2),
				"utf-8",
			);
		}),
	);
};

await generateMetaFiles();
