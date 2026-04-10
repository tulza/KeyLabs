import {
	createElement,
	ElementType,
	HTMLAttributes,
	PropsWithChildren,
} from "react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const typography = tv({
	base: "text-pretty",
	variants: {
		inline: {
			true: "inline whitespace-pre-wrap",
		},
		size: {
			large: "text-lg",
			base: "text-base",
			small: "text-sm",
		},
		align: {
			center: "inline-block items-center text-center",
		},
	},
	defaultVariants: {
		size: "base",
	},
});

export type TypographyVariants = VariantProps<typeof typography>;

interface TypographyProps
	extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
	as?: ElementType;
	size?: TypographyVariants["size"];
	inline?: TypographyVariants["inline"];
	align?: TypographyVariants["align"];
}

export const Text = (props: TypographyProps) => {
	const { children, as = "p", size, inline, align, ...rest } = props;

	return createElement(
		as,
		{
			...rest,
			className: cn(typography({ size, inline, align }), props.className),
		},
		children,
	);
};
