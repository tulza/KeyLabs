import Link from "next/link";
import { PageContainer } from "@/components/container/PageContainer";
import { GitHubIcon } from "@/components/icon";
import { NavigationBar } from "../_components/ui/navigation-bar";

export default async function AboutPage() {
	return (
		<PageContainer className="overflow-hidden">
			<NavigationBar />
			<About />
		</PageContainer>
	);
}

const stats = [
	{
		label: "raw lpm",
		description: "Total number of correct hits per minute.",
	},
	{
		label: "lpm",
		description:
			"Calculated like raw lpm with accuracy as a multiplier applied.",
	},
	{
		label: "accuracy",
		description: "Correct hits divided by total clicked letters.",
	},
	{
		label: "target size",
		description: "How big the hit circle is in pixels.",
	},
];

const About = () => {
	return (
		<div className="mt-32 flex size-full w-full grow flex-col self-center">
			<div className="flex w-full max-w-page flex-col gap-6 self-center **:[&>a]:underline">
				<h1 className="self-center text-foreground/50">
					Made with coffee by{" "}
					<Link href="https://github.com/tulza">Tulza</Link>.
				</h1>
				<h3 className="w-min font-serif text-2xl">About</h3>
				<p>
					KeyLabs is an online aim-to-type game inspired by typing
					platforms such as MonkeyType and TypeRacer, as well as aim
					trainers like AimLabs and Aimbooster. The goal of KeyLabs is
					to combine typing and aiming mechanics into a single
					competitive training experience.
				</p>

				<h3 className="w-min font-serif text-2xl">Credits</h3>
				<p>
					This project was heavily inspired by{" "}
					<Link href="https://github.com/monkeytypegame/monkeytype">
						MonkeyType
					</Link>
					. The word set data used in this project is sourced from
					their repository.
				</p>
				<p>
					This is a recreation of an old project{" "}
					<Link href="https://github.com/RuffByte/KeyLabs">here</Link>{" "}
					but built for more extensibility.
				</p>

				<h3 className="w-min font-serif text-2xl">Statistics</h3>
				<table className="w-full table-fixed text-sm">
					<thead>
						<tr>
							<th className="w-1/5" />
							<th className="w-4/5" />
						</tr>
					</thead>
					<tbody className="text-left font-medium **:border **:border-secondary *:p-3">
						{stats.map(({ label, description }) => (
							<tr key={label}>
								<td className="p-3 text-icon">{label}</td>
								<td className="p-3 text-icon">{description}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h3 className="w-min font-serif text-2xl">Support</h3>
				<p>
					You can support this project by giving it a star on GitHub,
					or if you have a good idea, let me know :D
				</p>
				<div className="grid grid-cols-2 gap-3">
					<Link
						href="https://github.com/tulza/keylabs"
						className="flex size-full items-center justify-center gap-2 rounded bg-secondary p-3 py-6 font-serif text-secondary-foreground text-xl no-underline hover:bg-secondary/80"
					>
						<GitHubIcon />
						GitHub
					</Link>
					<Link
						href="/"
						className="flex size-full items-center justify-center gap-2 rounded bg-secondary p-3 py-6 font-serif text-secondary-foreground text-xl no-underline hover:bg-secondary/80"
					>
						Discord
					</Link>
				</div>
			</div>
		</div>
	);
};
