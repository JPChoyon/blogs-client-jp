"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? "Failed to create post");
      }

      const newPost = await res.json();
      // navigate to the newly created post
      router.push(`/posts/${newPost._id}`);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded border px-3 py-2"
            placeholder="My first post"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded border px-3 py-2"
            placeholder="Your name (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded border px-3 py-2 min-h-[150px]"
            placeholder="Write your post..."
            required
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded disabled:opacity-60"
          >
            {loading ? "Posting..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
