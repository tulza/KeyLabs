import Elysia from "elysia";
import { auth } from "@/lib/auth";

export const betterAuthPlugin = new Elysia({ name: "better-auth" })
	.mount(auth.handler)
	.macro({
		auth: {
			async resolve({ status, request: { headers } }) {
				const session = await auth.api.getSession({
					headers,
				});

				if (!session)
					return status(401, {
						message: "Unauthorized access",
						code: "UNAUTHORIZED",
					});

				return {
					user: session.user,
					session: session.session,
				};
			},
		},
		optionalAuth: {
			async resolve({ request: { headers } }) {
				const session = await auth.api.getSession({ headers });

				return {
					user: session?.user ?? null,
					session: session?.session ?? null,
				};
			},
		},
	});

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
const getSchema = async () => {
	if (!_schema) {
		_schema = auth.api.generateOpenAPISchema();
	}
	return _schema;
};

export const OpenAPI = {
	getPaths: (prefix = "/api") =>
		getSchema().then(({ paths }) => {
			const reference: typeof paths = Object.create(null);

			for (const path of Object.keys(paths)) {
				const key = prefix + path;
				reference[key] = paths[path];

				for (const method of Object.keys(paths[path])) {
					const operation = (reference[key] as any)[method];

					operation.tags = ["Better Auth"];
				}
			}

			return reference;
		}) as Promise<any>,
	components: getSchema().then(
		({ components }) => components,
	) as Promise<any>,
} as const;
