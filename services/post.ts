import { HttpError } from "../models/deps.ts";
import { Post, PostInput, Posts } from "../models/post.ts";

export class PostService {
  posts: Post[] = [];
  get(id: unknown): Post {
    if (typeof id === "string") {
      try {
        const parsedId = parseFloat(id);
        if (`${parsedId}` === id) {
          id = parsedId;
        }
      } catch (error) {
        throw new HttpError(400, "invalid id", { cause: error });
      }
    }

    if (typeof id !== "number" || Number.isNaN(id)) {
      throw new HttpError(400, "invalid id");
    }

    if (id < 0 || id !== Math.floor(id)) {
      throw new HttpError(400, "id must be positive integer");
    }

    if (!this.posts[id]) throw new HttpError(404, "not found");

    return this.posts[id];
  }

  getAll(): Posts {
    const { posts } = this;
    return { posts };
  }

  add({ title, content }: PostInput): Post {
    if (!title) {
      throw new HttpError(400, "title required");
    } else if (typeof title !== "string") {
      throw new HttpError(400, "invalid title");
    }

    if (!content) {
      throw new HttpError(400, "content required");
    } else if (typeof content !== "string") {
      throw new HttpError(400, "invalid content");
    }

    const post: Post = { id: this.posts.length, title, content };
    this.posts.push(post);
    return post;
  }
}

const postService = new PostService();
// Add default post
postService.add({ title: "Hello world!", content: "My first post." });
export { postService };
