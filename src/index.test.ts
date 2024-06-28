import { describe, test, expect } from "@jest/globals";
import app from "./index";
import {
  GetUserIdRouteResponse200,
  GetUserIdRouteResponse404,
} from "./index.route";

// -------- GET /users/{id} --------
describe("GET /users/{id}", () => {
  test("[success] idを指定してユーザーの情報を取得する", async () => {
    const userId = "100";
    const res = await app.request(`/users/${userId}`, {
      method: "GET",
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as GetUserIdRouteResponse200;
    expect(body).toEqual({
      id: userId,
      age: 25,
      name: "Kaeya Alberich",
      tel: "0123-456-789",
    });
  });
  test("[error] idが不正", async () => {
    const invalidUserId = "1000";
    const res = await app.request(`/users/${invalidUserId}`, {
      method: "GET",
    });
    expect(res.status).toBe(400);
  });
  test("[error] idが存在しない", async () => {
    const noExistUserId = "999";
    const res = await app.request(`/users/${noExistUserId}`, {
      method: "GET",
    });
    expect(res.status).toBe(404);
    const body = (await res.json()) as GetUserIdRouteResponse404;
    expect(body).toEqual({
      message: "Not Found",
    });
  });
});
