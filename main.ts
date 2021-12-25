import { Application, extname, Router } from "./deps.ts";
import { ssr } from "./components/server.tsx";
import { isDevelopment } from "./utils/environment.ts";
import { trySend } from "./utils/oak.ts";

interface Post {
  title: string;
  content: string;
}
const posts: Post[] = [];

const app = new Application();
const router = new Router();

router
  .use(async ({ request }, next) => {
    console.log(request.method, request.url.href);
    await next();
  })
  .get("/api/posts", ({ response }) => {
    response.body = { posts };
  })
  .get("/api/post/:postId", ({ response, params }) => {
    response.body = {
      post: posts[parseInt(params.postId)],
    };
  })
  .post("/api/post", async ({ request, response }) => {
    const body = await request.body({ type: "form" }).value;
    const title = body.get("title");
    const content = body.get("content");
    if (title && content) {
      posts.push({ title, content });
      response.body = { success: true };
    } else {
      response.status = 400;
      response.body = {
        success: false,
        error: `missing ${
          [title && "title", content && "content"].filter(Boolean).join(" and ")
        }`,
      };
    }
  })
  .get("/api(/.*)?", () => {})
  .get("/(.*)", async (context) => {
    const { request, response } = context;
    const { pathname, search } = request.url;
    if (pathname.length > 1 && pathname.slice(-1) === "/") {
      const redirectUrl = new URL(request.url);
      redirectUrl.pathname = pathname.replace(/\/+$/, "");
      response.status = 301;
      response.redirect(redirectUrl);
    } else if (extname(pathname) === "") {
      response.status = 200;
      response.body = ssr(pathname + search);
    } else {
      let filename: string | undefined = undefined;
      if (isDevelopment()) {
        filename = await trySend(context, {
          root: `${Deno.cwd()}/public/development`,
        });
      }
      if (!filename) {
        await trySend(context, { root: `${Deno.cwd()}/public/all` });
      }
    }
  });

app.use(router.routes(), router.allowedMethods());

app.addEventListener("error", ({ error }) => {
  console.error("Uncaught error", error);
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname}:${port}`,
  );
  if (isDevelopment()) {
    fetch("http://localhost:8001/live-reload/trigger", { method: "post" })
      .catch((error) => {
        console.log("could not trigger live reload");
        console.error(error);
      });
  }
});

await app.listen({ hostname: "localhost", port: 8000 });
