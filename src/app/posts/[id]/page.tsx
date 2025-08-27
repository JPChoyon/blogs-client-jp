import { notFound } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  content: string;
  author?: string;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(`${API_URL}/api/posts/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

// ✅ Inline params typing
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  return (
    <div className="py-10 px-4">
      <article className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          By {post.author ?? "Anonymous"} •{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>
      </article>
    </div>
  );
}
