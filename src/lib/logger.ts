import fs from "fs";
import path from "path";

type LogData = string | number | object | null;

export const logger = (data: LogData, name: string): void => {
	const logsDir = path.resolve("./.logs");

	if (!fs.existsSync(logsDir)) {
		fs.mkdirSync(logsDir, { recursive: true });
	}

	const filePath = path.join(logsDir, `${name}.json`);

	const entry = {
		timestamp: new Date().toISOString(),
		data,
	};

	let existing: object[] = [];

	if (fs.existsSync(filePath)) {
		try {
			const raw = fs.readFileSync(filePath, "utf-8");
			const parsed = JSON.parse(raw);
			existing = Array.isArray(parsed) ? parsed : [parsed];
		} catch {
			existing = [];
		}
	}

	existing.push(entry);

	fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
};
