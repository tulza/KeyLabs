"use client";

import { NuqsAdapter } from "nuqs/adapters/react";
import { PropsWithChildren } from "react";

export const AppProvider = ({ children }: PropsWithChildren) => {
	return <NuqsAdapter>{children}</NuqsAdapter>;
};
