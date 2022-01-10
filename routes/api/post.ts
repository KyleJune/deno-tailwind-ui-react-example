import { Router } from "../../deps.ts";
import { HttpError } from "../../models/deps.ts";
import { PostInput } from "../../models/post.ts";
import { postService } from "../../services/post.ts";

export const postRouter = new Router()
  .get("/:id", ({ response, params }) => {
    response.body = postService.get(params.id);
  })
  .post("/", async ({ request, response }) => {
    let input: PostInput;
    try {
      input = await request.body({ type: "json" }).value;
    } catch (cause) {
      throw new HttpError(400, "invalid JSON", { cause });
    }

    if (typeof input !== "object") {
      throw new HttpError(400, "not an object");
    }
    response.body = postService.add(input);
  });

export const postsRouter = new Router()
  .get("/posts", ({ response }) => {
    response.body = postService.getAll();
  })
  .use("/post", postRouter.routes(), postRouter.allowedMethods());
