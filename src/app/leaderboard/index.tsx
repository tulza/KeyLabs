import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/container/PageContainer";
import { Background } from "../_components/feature/background";
import { NavigationBar } from "../_components/ui/navigation-bar";
import { LeaderboardScore } from "./_components/feature/leaderboard-score";

export const Route = createFileRoute("/leaderboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer className="overflow-hidden">
      <Background />
      <NavigationBar />
      <Leaderboard />
    </PageContainer>
  );
}

export const Leaderboard = () => {
  return (
    <div className="mt-32 flex size-full w-full max-w-300 grow flex-col gap-6 self-center px-12">
      <LeaderboardScore />
    </div>
  );
};
