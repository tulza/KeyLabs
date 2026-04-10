"use client";

import { Link } from "@tanstack/react-router";
import { ComponentProps } from "react";
import { UserAvatar } from "@/components/avatar/avatar";
import { CrownIcon, CursorIcon, GearIcon, InfoIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type NavItem = {
	to?: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	hint?: string;
};

const navItems: NavItem[] = [
	{ to: "/leaderboard", icon: CrownIcon, hint: "Leaderboard" },
	{ to: "/settings", icon: GearIcon, hint: "Settings" },
	{ to: "/info", icon: InfoIcon, hint: "Info" },
];

const IconButton = ({
	to,
	icon: Icon,
	hint,
	...props
}: NavItem & ComponentProps<typeof Button>) => {
	const button = (
		<Button
			{...props}
			size="icon"
			variant="secondary"
			className={props.className}
			asChild
		>
			<Link to={to}>
				<Icon className="size-5" />
			</Link>
		</Button>
	);

	if (!hint) return button;

	return (
		<Tooltip>
			<TooltipTrigger asChild>{button}</TooltipTrigger>
			<TooltipContent>{hint}</TooltipContent>
		</Tooltip>
	);
};

export const NavigationBar = () => (
	<div className="flex w-full justify-center">
		<div className="absolute top-8 flex w-200 justify-between">
			<Link to="/" className="flex select-none items-center gap-3">
				<IconButton icon={CursorIcon} className="pointer-events-none" />
				<h1 className="font-serif text-3xl text-icon italic">
					Keylabs
				</h1>
			</Link>
			<TooltipProvider>
				<div className="flex gap-3">
					{navItems.map((item) => (
						<IconButton key={item.to} {...item} />
					))}
					<Profile />
				</div>
			</TooltipProvider>
		</div>
	</div>
);

const Profile = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					size="icon"
					variant="secondary"
					className="rounded"
					asChild
				>
					<Link to="/sign-in">
						<UserAvatar />
					</Link>
				</Button>
			</TooltipTrigger>
			<TooltipContent>Profile</TooltipContent>
		</Tooltip>
	);
};
