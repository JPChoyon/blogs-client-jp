import Link from "next/link";
import type { Post } from "../types/post";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/api/posts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function HomePage() {
  let posts: Post[] = [];
  try {
    posts = await getPosts();
  } catch (err) {
    console.error("Error fetching posts:", err);
  }

  return (
    <div className="py-10 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <p className="text-sm text-gray-600">Read the most recent posts</p>
      </header>

      <section className="space-y-4">
        {posts.length === 0 ? (
          <div className="p-6 bg-white rounded shadow text-gray-600">
            No posts yet.
          </div>
        ) : (
          posts.map((post) => (
            <article key={post._id} className="p-4 bg-white rounded shadow">
              <Link href={`/posts/${post._id}`}>
                <h2 className="text-xl font-semibold hover:underline">
                  {post.title}
                </h2>
              <p className="text-xs text-gray-500">
                By {post.author ?? "Anonymous"} •{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 text-gray-700 line-clamp-3">{post.content}</p>
              </Link>
            </article>
          ))
        )}
      </section>

      <div className="mt-8">
        <Link
          href="/new"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create new post
        </Link>
      </div>
    </div>
  );
}
