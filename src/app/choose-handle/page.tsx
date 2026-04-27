import { redirect } from "next/navigation";
import { PageContainer } from "@/components/container/PageContainer";
import { getSession } from "@/lib/auth.functions";
import { ChooseHandleForm } from "./feature/choose-handle-form";

export default async function ChooseHandlePage() {
	const session = await getSession();

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<PageContainer className="overflow-hidden">
			<ChooseHandleForm />
		</PageContainer>
	);
}
