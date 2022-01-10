import { isDevelopment } from "../config.ts";
import { etag, extname, Router } from "../deps.ts";
import { getQueryClient, trySend } from "../utils/oak.ts";
import { ssr } from "../components/server.tsx";
import { apiRouter } from "./api/main.ts";
import { postService } from "../services/post.ts";
import { errorJSON } from "../models/error.ts";
import { HttpError } from "../models/deps.ts";
import { PostInput } from "../models/post.ts";

const mainRouter = new Router()
  .use(async ({ request, response }, next) => {
    console.log(request.method, request.url.href);
    const start = Date.now();
    try {
      await next();
    } finally {
      const dt = Date.now() - start;
      response.headers.set("X-Response-Time", `${dt}ms`);
    }
  })
  .use(async ({ request, response }, next) => {
    const { pathname } = request.url;
    if (pathname.length > 1 && pathname.slice(-1) === "/") {
      const redirectUrl = new URL(request.url);
      redirectUrl.pathname = pathname.replace(/\/+$/, "");
      response.status = 301;
      response.redirect(redirectUrl);
    } else {
      await next();
    }
  })
  .use(etag.factory())
  .use("/api", apiRouter.routes(), apiRouter.allowedMethods())
  .get("/posts", async (context, next) => {
    const queryClient = getQueryClient(context);
    await queryClient.prefetchQuery(
      "getPosts",
      () => {
        try {
          return postService.getAll();
        } catch (error) {
          throw errorJSON(error);
        }
      },
    );
    await next();
  })
  .post("/posts", async ({ request, response }) => {
    let form: URLSearchParams;
    try {
      form = await request.body({ type: "form" }).value;
    } catch (cause) {
      throw new HttpError(400, "invalid form data", { cause });
    }

    const input: PostInput = {};
    for (const [key, value] of form) {
      input[key as keyof PostInput] = value;
    }
    const post = postService.add(input);
    response.redirect(`/post/${post.id}`);
  })
  .get("/post/:id", async (context, next) => {
    const queryClient = getQueryClient(context);
    const { params } = context;
    await queryClient.prefetchQuery(
      ["getPost", params.id],
      () => {
        try {
          return postService.get(params.id);
        } catch (error) {
          throw errorJSON(error);
        }
      },
    );
    await next();
  })
  .get("/(.*)", async (context, next) => {
    const { request, response } = context;
    const { pathname } = request.url;
    if (extname(pathname) === "") {
      const body = ssr(context);
      response.status = 200;
      response.body = body;
    } else {
      await next();
    }
  })
  .use(async (context) => {
    let filename: string | undefined = undefined;
    if (isDevelopment()) {
      filename = await trySend(context, {
        root: `${Deno.cwd()}/public/development`,
      });
    }
    if (!filename) {
      await trySend(context, { root: `${Deno.cwd()}/public/all` });
    }
  });

export { mainRouter };
