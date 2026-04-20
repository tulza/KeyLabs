import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { User } from "better-auth";
import { UserPersonalBestScore } from "@/server/types/game-result";
import { ProfileScore } from "./profile-scores";

const meta = {
	title: "profile/scores",
	component: ProfileScore,
	decorators: [],
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof ProfileScore>;

export default meta;
type Story = StoryObj<typeof meta>;

const scores: UserPersonalBestScore[] = [
	{
		userId: "CtGRV7QJHlS3L86wS5m0xRaRroO6zIP5",
		gameId: 30,
		mode: "time",
		mode2: 15,
		wordSet: "english",
		targetSize: 80,
		lpm: 124.44,
		accuracy: 0.94285715,
		score: 0,
		updatedAt: new Date("2026-04-19T06:31:57.863Z"),
	},
	{
		userId: "CtGRV7QJHlS3L86wS5m0xRaRroO6zIP5",
		gameId: 21,
		mode: "time",
		mode2: 30,
		wordSet: "english",
		targetSize: 80,
		lpm: 110.3,
		accuracy: 0.9508197,
		score: 0,
		updatedAt: new Date("2026-04-16T16:21:50.094Z"),
	},
	{
		userId: "CtGRV7QJHlS3L86wS5m0xRaRroO6zIP5",
		gameId: 27,
		mode: "characters",
		mode2: 30,
		wordSet: "english",
		targetSize: 80,
		lpm: 102.22,
		accuracy: 0.90909094,
		score: 0,
		updatedAt: new Date("2026-04-18T07:24:03.622Z"),
	},
	{
		userId: "CtGRV7QJHlS3L86wS5m0xRaRroO6zIP5",
		gameId: 32,
		mode: "time",
		mode2: 15,
		wordSet: "english_5k",
		targetSize: 80,
		lpm: 88.35,
		accuracy: 0.8181818,
		score: 0,
		updatedAt: new Date("2026-04-19T08:43:56.039Z"),
	},
];

const user: User = {
	name: "user",
	email: "user@gmail.com",
	emailVerified: true,
	image: "https://avatars.githubusercontent.com/u/40633228?v=4",
	createdAt: new Date("2026-04-10T10:16:42.540Z"),
	updatedAt: new Date("2026-04-10T10:16:42.540Z"),
	id: "CtGRV7QJHlS3L86wS5m0xRaRroO6zIP5",
};

export const Primary: Story = {
	args: {
		scores,
		user,
	},
};
