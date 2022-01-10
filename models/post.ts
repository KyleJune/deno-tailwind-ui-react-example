export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface Posts {
  posts: Post[];
}

export interface PostInput {
  id?: unknown;
  title?: unknown;
  content?: unknown;
}
