import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageContainer } from "@/components/container/PageContainer";
import { getSession } from "@/lib/auth.functions";
import { api } from "@/lib/eden";
import { NavigationBar } from "../_components/ui/navigation-bar";
import { ProfileScore } from "./_components/feature/profile-scores";

export default async function ProfilePage() {
	const _header = await headers();
	const session = await getSession();
	const { data } = await api.profile.get({ headers: _header });

	if (!session) {
		redirect("/sign-in");
	}

	const scores = data || [];
	const user = session.user;

	return (
		<PageContainer className="overflow-hidden">
			<NavigationBar />
			<ProfileScore scores={scores} user={user} />
		</PageContainer>
	);
}
