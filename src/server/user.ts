import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "@/db";
import { user as userTable } from "@/db/schema";
import { AccountStatus } from "@/lib/game/enum";
import { betterAuthPlugin } from "./better-auth";
import { validateHandle } from "./service/handle.utils";

export const user = new Elysia({ name: "user" }).group("/user", (app) =>
	app
		.use(betterAuthPlugin)
		.get("/", ({ user }) => user, { auth: true })
		.patch(
			"/handle",
			async ({ body, user, status }) => {
				const error = validateHandle(body.handle);

				if (error) {
					return status(400, {
						message: error,
						code: "INVALID_HANDLE",
					});
				}

				const [updated] = await db
					.update(userTable)
					.set({
						handle: body.handle,
						status: AccountStatus.ACTIVE,
					})
					.where(eq(userTable.id, user.id))
					.returning();

				if (!updated) {
					return status(409, {
						message: "Handle already taken.",
						code: "HANDLE_TAKEN",
					});
				}

				return status(200, {
					handle: updated.handle,
				});
			},
			{
				auth: true,
				body: t.Object({
					handle: t.String({ minLength: 3, maxLength: 15 }),
				}),
			},
		)
		.get(
			"/handle/verify",
			async ({ query, status }) => {
				const error = validateHandle(query.handle);
				if (error) return status(400, error);

				const [existing] = await db
					.select({ id: userTable.id })
					.from(userTable)
					.where(eq(userTable.handle, query.handle))
					.limit(1);

				if (existing) return status(200, { available: false });

				return status(200, { available: true });
			},
			{
				query: t.Object({ handle: t.String() }),
			},
		),
);
