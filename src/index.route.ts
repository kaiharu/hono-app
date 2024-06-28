import { z, createRoute } from "@hono/zod-openapi";

// -------- Schemas --------
const ParamsSchema = z.object({
  id: z
    .number()
    .min(1)
    .max(999)
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: 100,
    }),
});

const UserOutputSchema = z
  .object({
    id: z.number().min(1).max(999).openapi({
      example: 100,
    }),
    age: z.number().min(1).max(200).openapi({
      example: 25,
    }),
    name: z.string().openapi({
      example: "Kaeya Alberich",
    }),
    tel: z
      .string()
      .max(13)
      .regex(/^\d+-\d+-\d+$/)
      .optional()
      .openapi({
        example: "0123-456-789",
      }),
  })
  .openapi("User");

// -------- GET /users/{id} --------
export const getUserIdRoute = createRoute({
  method: "get" as const,
  path: "/users/{id}",
  summary: "get user info",
  description: "idでユーザーの情報を取得する",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: UserOutputSchema,
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "User not found",
            }),
          }),
        },
      },
    },
  },
});
export type GetUserIdRouteResponse200 = z.infer<
  (typeof getUserIdRoute.responses)["200"]["content"]["application/json"]["schema"]
>;
export type GetUserIdRouteResponse404 = z.infer<
  (typeof getUserIdRoute.responses)["404"]["content"]["application/json"]["schema"]
>;
