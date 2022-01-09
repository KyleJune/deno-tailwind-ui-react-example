/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import { isBrowser } from "../config.ts";
import { ErrorJSON } from "../models/error.ts";
import { Post } from "../models/post.ts";
import {
  ErrorBoundary,
  Helmet,
  Link,
  React,
  useMutation,
  useNavigate,
  useParams,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from "./deps.ts";
import { ErrorFallback } from "./error.tsx";
import { postApi, queryApi } from "./query.ts";
const { Suspense, useState } = React;

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation((e: React.FormEvent) => {
    e.preventDefault();
    return postApi<Post>("/api/post", {
      body: JSON.stringify({ title, content }),
    });
  }, {
    async onSuccess(post: Post) {
      navigate(`/post/${post.id}`);
      await queryClient.invalidateQueries("posts");
    },
  });
  const { error, error_description } = (mutation.error as ErrorJSON) ?? {};
  return (
    <form onSubmit={mutation.mutate}>
      <h2>New Post</h2>
      {error && (
        <h5 onClick={() => mutation.reset()}>{error}: {error_description}</h5>
      )}
      <label>
        Title:
        <input
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Content:
        <input
          name="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export const getPosts = async (
  baseUrl?: URL | string,
) => {
  let path = "/api/posts";
  if (baseUrl) path = new URL(path, baseUrl).href;
  return await queryApi<{ posts: Post[] }>(path);
};

export const PostListFallback = () => <p>Loading posts...</p>;

export const PostList = () => {
  const { data } = useQuery(
    "getPosts",
    () => getPosts(),
  );
  return (
    <ul>
      {data?.posts.map((post) => (
        <li key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
      ))}
      {/* Test the error boundaries by clicking these links. */}
      <li>
        <Link to="/post/invalid">Invalid</Link>
      </li>
      <li>
        <Link to="/post/-1">Negative</Link>
      </li>
    </ul>
  );
};

export const PostDirectory = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>
      <h2>Posts</h2>
      <ErrorBoundary
        onReset={reset}
        FallbackComponent={ErrorFallback}
      >
        {/* Switch to just using Suspense after updating to React 18. */}
        {isBrowser()
          ? (
            <Suspense fallback={<PostListFallback />}>
              <PostList />
            </Suspense>
          )
          : <PostList />}
        <PostForm />
      </ErrorBoundary>
    </>
  );
};

export const getPost = async (
  id: number,
  baseUrl?: URL | string,
) => {
  let path = `/api/post/${id}`;
  if (baseUrl) path = new URL(path, baseUrl).href;
  return await queryApi<Post>(path);
};

export const PostDetailFallback = () => <p>Loading post...</p>;

export const PostDetail = () => {
  const { id } = useParams();
  if (!id) throw new Error("invalid post id");
  const { data: post } = useQuery(
    ["getPost", id],
    () => getPost(parseInt(id)),
  );
  return (
    <>
      <Helmet>
        <title>{post?.title}</title>
      </Helmet>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
    </>
  );
};

export const PostView = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <>
      <Helmet>
        <title>Post</title>
      </Helmet>
      <ErrorBoundary
        onReset={reset}
        FallbackComponent={ErrorFallback}
      >
        {/* Switch to just using Suspense after updating to React 18. */}
        {isBrowser()
          ? (
            <Suspense fallback={<PostDetailFallback />}>
              <PostDetail />
            </Suspense>
          )
          : <PostDetail />}
      </ErrorBoundary>
    </>
  );
};
