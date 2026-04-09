import { SidebarTag } from "@ui/sidebar";
import {
	ArrowRightLeft,
	Blend,
	Bookmark,
	Home,
	Info,
	Palette,
	PanelsTopLeft,
	Pipette,
	Table,
	Tag,
	Webhook,
	Wrench,
} from "lucide-react";
import { ReactNode } from "react";

export type NavigationType = {
	icon: ReactNode;
	label: string;
	href: string;
	shortcut?: string;
	tag?: ReactNode;
	makeButton?: boolean;
};

export const generalItems = [
	{
		label: "Home",
		href: "/",
		icon: <Home className="text-neutral500" />,
	},
];

export const toolkitItems: NavigationType[] = [
	{
		label: "Color Picker",
		href: "/color/picker",
		icon: <Pipette size={20} className="stroke-pink" />,
	},
	{
		label: "Color Converter",
		href: "/color/converter",
		icon: <ArrowRightLeft size={20} className="stroke-purple" />,
		tag: <SidebarTag>SOON</SidebarTag>,
	},
	{
		label: "Color Mixer",
		href: "/color/mixer",
		icon: <Blend size={20} className="stroke-blue" />,
		tag: <SidebarTag>SOON</SidebarTag>,
	},
	{
		label: "Color Name",
		href: "/color/name",
		icon: <Tag size={20} className="stroke-aqua" />,
		tag: <SidebarTag>SOON</SidebarTag>,
	},
	{
		label: "Palette Generator",
		href: "/color/palette",
		icon: <Table size={20} className="stroke-green" />,
		tag: <SidebarTag>SOON</SidebarTag>,
	},
];

export const integrationItems = [
	{
		label: "Mock Website",
		href: "/mocking",
		icon: <PanelsTopLeft size={20} className="stroke-yellow" />,
		tag: <SidebarTag>SOON</SidebarTag>,
	},
	{
		label: "API",
		href: "/api/docs",
		icon: <Webhook size={20} className="stroke-red" />,
	},
];

export const otherItems = {
	about: {
		label: "About",
		href: "#",
		icon: <Info size={20} className="stroke-neutral500" />,
	},
	bookmark: {
		label: "Bookmark",
		href: "#",
		icon: <Bookmark size={20} className="stroke-neutral500" />,
		tag: <SidebarTag>SOON</SidebarTag>,
	},
	themes: {
		label: "Themes",
		href: "#",
		icon: <Palette size={20} className="stroke-neutral500" />,
	},
	changelog: {
		label: "Changelog",
		href: "#",
		icon: <Wrench size={20} className="stroke-neutral500" />,
	},
};
