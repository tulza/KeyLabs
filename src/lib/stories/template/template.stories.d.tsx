import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fullscreenWrapper } from "@/libs/stories/decorators/fullscreen-wrapper";
import { Template } from "./template";

const meta = {
	title: "website/component/",
	component: Template,
	decorators: [fullscreenWrapper],
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Template>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
