import { extname, Router } from "../../deps.ts";
import { isDevelopment } from "../../config.ts";
import { postsRouter } from "./post.ts";
import { isHttpError } from "../../models/deps.ts";
import { ErrorJSON } from "../../models/error.ts";

export const apiRouter = new Router()
  .use(async ({ request, response }, next) => {
    try {
      await next();
    } catch (error) {
      console.error("apiRouter error", error);
      response.status = isHttpError(error) ? error.status : 500;
      const ext = extname(request.url.pathname);
      if (ext === "" || ext === ".json") {
        const body: ErrorJSON = {
          error: error.name,
        };
        const showStack = isDevelopment();
        if (error.message && (error.expose || showStack)) {
          body.error_description = error.message;
        }
        if (showStack && error.stack) {
          body.error_stack = error.stack;
        }
        response.body = body;
      }
    }
  })
  .use(postsRouter.routes(), postsRouter.allowedMethods());
