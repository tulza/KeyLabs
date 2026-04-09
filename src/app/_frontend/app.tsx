"use client";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { LandingPage } from "./page/landing-page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/",
				element: <LandingPage />,
			},
		],
	},
]);

function RootLayout() {
	return (
		<>
			<Outlet />
		</>
	);
}

export default function App() {
	return <RouterProvider router={router} />;
}
