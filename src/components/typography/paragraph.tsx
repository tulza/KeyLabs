import {
	createElement,
	ElementType,
	HTMLAttributes,
	PropsWithChildren,
} from "react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "@/libs/utils/className";

const typography = tv({
	base: "text-pretty text-muted",
	variants: {
		inline: {
			true: "inline whitespace-pre-wrap",
		},
		size: {
			large: "desktop:text-lg text-base",
			base: "desktop:text-base text-xs",
			small: "desktop:text-sm text-xs",
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

export const Paragraph = (props: TypographyProps) => {
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
