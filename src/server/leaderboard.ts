import Elysia from "elysia";
import { betterAuthPlugin } from "./better-auth";

export const leaderboard = new Elysia({ name: "leaderboard" }).group(
  "/leaderboard",
  (app) =>
    app.use(betterAuthPlugin).get(
      "/",
      async ({ user, status }) => {
        return status(501, "not_implemented");
      },
      { optionalAuth: true },
    ),
);
