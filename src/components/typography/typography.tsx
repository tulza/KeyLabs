import {
	type ComponentPropsWithoutRef,
	createElement,
	type ElementType,
	type ReactNode,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/libs/utils/className";

const typography = tv({
	base: "text-base leading-tight",
	variants: {
		size: {
			hero: "font-semibold text-[80px] leading-none",
			heading: "font-semibold text-[64px] leading-[50px]",
			subheading: "text-xl",
			paragraph: "text-xl",
			button: "font-medium text-base",
			small: "text-sm",
			footerHeading: "font-medium text-sm",
		},
	},
	defaultVariants: {
		size: "paragraph",
	},
});
export type TypographyVariants = VariantProps<typeof typography>;

export const allSize: NonNullable<TypographyVariants["size"]>[] = [
	"hero",
	"heading",
	"subheading",
	"paragraph",
	"button",
	"small",
	"footerHeading",
];

type TypographyOwnProps<T extends ElementType = "span"> = {
	as?: T;
	children?: ReactNode;
	size?: TypographyVariants["size"];
};

export type TypographyProps<T extends ElementType = "span"> =
	TypographyOwnProps<T> &
		Omit<ComponentPropsWithoutRef<T>, keyof TypographyOwnProps<T>>;

export function Typography<T extends ElementType = "span">(
	props: TypographyProps<T>,
) {
	const { children, as, size, className, ...rest } = props;
	return createElement(
		(as ?? "span") as ElementType,
		{
			...(rest as Record<string, unknown>),
			className: cn(typography({ size }), className),
		},
		children,
	);
}
