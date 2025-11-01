"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Post = { id: string; title: string; body: string; user: { name: string } };
type Reply = { id: string; body: string; createdAt: string; user: { name: string } };

export default function ThreadPage() {
  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [body, setBody] = useState("");

  useEffect(() => {
    fetch(`/api/forum/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setPost(d.post);
        setReplies(d.replies);
      });
  }, [id]);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/forum/${id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, userId: "placeholder@campus.local" }),
    });
    if (res.ok) {
      const created = await res.json();
      setReplies((r) => [...r, created]);
      setBody("");
    } else alert("Reply failed");
  }

  if (!post) return <p className="p-6 text-white">Loading…</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <p className="text-sm text-neutral-400 mt-1">by {post.user.name}</p>
          <p className="mt-4 text-neutral-200">{post.body}</p>
        </div>

        <div className="space-y-4">
          {replies.map((r) => (
            <div key={r.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
              <p className="text-sm text-neutral-400">{r.user.name} · {new Date(r.createdAt).toLocaleString()}</p>
              <p className="mt-2 text-neutral-200">{r.body}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleReply} className="space-y-3">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Write a reply…"
            rows={3}
            className="w-full rounded bg-white/10 border border-white/20 px-4 py-2 text-white"
          />
          <button type="submit" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition">Reply</button>
        </form>
      </div>
    </main>
  );
}