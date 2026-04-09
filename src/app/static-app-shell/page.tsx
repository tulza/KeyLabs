"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("@/app/_frontend/app"), { ssr: false });

export default function AppShell() {
	return <App />;
}
