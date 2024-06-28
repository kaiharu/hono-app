import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { getUserIdRoute } from "./index.route";

const app = new OpenAPIHono();

// -------- GET /users/{id} --------
app.openapi(getUserIdRoute, (c) => {
  const { id } = c.req.valid("param");
  if (id === "999") {
    return c.json({ message: "Not Found" }, 404);
  } else {
    return c.json(
      {
        id,
        age: 25,
        name: "Kaeya Alberich",
        tel: "0123-456-789",
      },
      200
    );
  }
});

// -------- ドキュメント生成 --------
app.doc("/docs/json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "APIドキュメント",
    description: `## 概要
APIを爆速でドキュメント化するためのサンプルプロジェクトです。
`,
  },
});
app.get("/docs/UI", swaggerUI({ url: "/docs/json" }));

export default app;
