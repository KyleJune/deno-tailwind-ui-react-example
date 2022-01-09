import { isDevelopment } from "../config.ts";
import { etag, extname, Router } from "../deps.ts";
import { getQueryClient, trySend } from "../utils/oak.ts";
import { ssr } from "../components/server.tsx";
import { apiRouter } from "./api/main.ts";
import { getPost, getPosts } from "../components/post.tsx";

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
      () => getPosts(context.request.url),
    );
    await next();
  })
  .get("/post/:id", async (context, next) => {
    const queryClient = getQueryClient(context);
    const { params, request } = context;
    await queryClient.prefetchQuery(
      ["getPost", params.id],
      () => getPost(parseInt(params.id), request.url),
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
