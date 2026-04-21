"use client";

import Link from "next/link";
import { ComponentProps, memo, ReactNode } from "react";
import { UserAvatar } from "@/components/avatar/avatar";
import {
	CrownIcon,
	CursorIcon,
	InfoIcon,
	ThemeIcon,
	UserIcon,
} from "@/components/icon";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { State } from "@/lib/game/enum";
import { useUser } from "@/lib/game/store/auth";
import { transition } from "@/lib/game/store/state-manager";
import { cn, hashCode } from "@/lib/utils";
import { ThemeSelectDrawer } from "./theme-select-drawer";

type NavItem = {
	to: string;
	icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	component?: ReactNode;
	hint?: string;
};

const navItems: NavItem[] = [
	{ to: "/leaderboard", icon: CrownIcon, hint: "Leaderboard" },
	{ to: "/about", icon: InfoIcon, hint: "About" },
	{
		to: "/theme",
		icon: ThemeIcon,
		hint: "Theme",
		component: <ThemeSelectDrawer />,
	},
	// { to: "/settings", icon: GearIcon, hint: "Settings" },
];

const IconButton = memo(
	({
		to,
		icon: Icon,
		hint,
		component,
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
				<Link href={to}>{Icon && <Icon className="size-5" />}</Link>
			</Button>
		);

		if (!hint) return button;

		return (
			<Tooltip>
				<TooltipTrigger asChild>{component || button}</TooltipTrigger>
				<TooltipContent>{hint}</TooltipContent>
			</Tooltip>
		);
	},
);

export const NavigationBar = () => (
	<div className="flex w-full justify-center">
		<div className="absolute top-8 flex w-225 justify-between">
			<Link href="/">
				<button
					onClick={() => transition(State.Resetting)}
					className="flex w-min cursor-pointer select-none items-center gap-3"
				>
					<div
						className={cn(
							buttonVariants({
								size: "icon",
								variant: "secondary",
							}),
							"pointer-events-none",
						)}
					>
						<CursorIcon className="size-5 *:fill-icon2" />
					</div>
					<h1 className="font-serif text-3xl text-icon italic">
						Keylabs
					</h1>
				</button>
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
	const user = useUser();

	if (!user) {
		<IconButton to="/profile" icon={UserIcon} hint="Profile" />;
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					size="icon"
					variant="secondary"
					className="rounded"
					asChild
				>
					<Link href="/profile">
						<UserAvatar avatarCode={hashCode(user?.id || "")} />
					</Link>
				</Button>
			</TooltipTrigger>
			<TooltipContent>Profile</TooltipContent>
		</Tooltip>
	);
};
