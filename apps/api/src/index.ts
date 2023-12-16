import { usersRoute } from "@/routes/users";
import { jsonResponse } from "@/utils";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const api = new Hono().basePath("/api");

/**
 * ユーザー関連のルート
 */
api.route("/users", usersRoute);

/**
 * ヘルスチェック
 */
api.get("/hc", (_c) => jsonResponse(""));

/**
 * エラーハンドリング
 */
api.onError((err, c) => {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}
	console.error(err);
	return c.text("internal server error", 500);
});

/**
 * サーバー起動
 */
serve(api);

console.log("Server running http://localhost:3000/api");
