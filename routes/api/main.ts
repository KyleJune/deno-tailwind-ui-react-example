import { extname, Router } from "../../deps.ts";
import { postsRouter } from "./post.ts";
import { HttpError, isHttpError } from "../../models/deps.ts";
import { errorJSON } from "../../models/error.ts";

export const apiRouter = new Router()
  .use(async ({ request, response }, next) => {
    try {
      await next();
    } catch (cause) {
      let error: HttpError;
      if (isHttpError(cause)) {
        error = cause;
      } else {
        error = new HttpError(500, "unhandled error", { cause });
      }
      console.error("apiRouter error", error);

      console.log(error.status, error, errorJSON(error));
      response.status = error.status;
      const ext = extname(request.url.pathname);
      if (ext === "" || ext === ".json") {
        response.body = errorJSON(error);
      }
    }
  })
  .use(postsRouter.routes(), postsRouter.allowedMethods());
