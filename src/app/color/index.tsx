import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/color/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/page/homd-page/"!</div>;
}
