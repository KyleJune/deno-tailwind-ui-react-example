import { Router } from "../../deps.ts";
import { HttpError } from "../../models/deps.ts";
import { Post } from "../../models/post.ts";

const posts: Post[] = [
  { id: 0, title: "Hello world!", content: "My first post." },
];

export const postRouter = new Router()
  .get("/:id", ({ response, params }) => {
    const id = parseInt(params.id);
    if (posts[id]) {
      response.body = posts[id];
    } else {
      throw new HttpError(404, "post not found");
    }
  })
  .post("/", async ({ request, response }) => {
    const body = await request.body({ type: "json" }).value;
    const { title, content } = body ?? {};
    if (title && content) {
      const post: Post = { id: posts.length, title, content };
      posts.push(post);
      response.body = post;
    } else {
      throw new HttpError(
        400,
        `missing ${
          [!title && "title", !content && "content"].filter(Boolean).join(
            " and ",
          )
        }`,
      );
    }
  });

export const postsRouter = new Router()
  .get("/posts", ({ response }) => {
    response.status = 200;
    response.body = { posts };
  })
  .use("/post", postRouter.routes(), postRouter.allowedMethods());
