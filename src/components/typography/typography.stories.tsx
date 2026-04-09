import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { title } from "radash";
import { allSize, Typography, TypographyVariants } from "./typography";

const meta = {
	title: "website/core/Typography",
	component: Typography,
	args: {
		children: "Hello World",
	},
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const All: Story = {
	render: () => (
		<div className="grid grid-cols-[120px_1fr] items-center gap-6">
			{allSize.map((size) => (
				<Display size={size} key={size} />
			))}
		</div>
	),
};

const Display = ({ size }: { size: TypographyVariants["size"] }) => {
	return (
		<>
			<p className="font-medium text-neutral-500 text-xs">
				{title(size)}
			</p>
			<Typography size={size}>Hello World</Typography>
		</>
	);
};
