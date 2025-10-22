"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string;
  user: { name: string };
  _count: { replies: number };
};

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/forum")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">Forum</h1>
          <Link href="/forum/new" className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition">
            + New Thread
          </Link>
        </div>

        <div className="space-y-4">
          {posts.map((p) => (
            <GlassThread key={p.id} post={p} />
          ))}
        </div>
      </div>
    </main>
  );
}

function GlassThread({ post }: { post: Post }) {
  const date = new Date(post.createdAt).toLocaleDateString();
  return (
    <Link href={`/forum/${post.id}`}>
      <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:shadow-lg transition">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {post.pinned && <span className="text-xs text-yellow-400">📌 Pinned</span>}
            <h3 className="text-lg font-semibold text-white mt-1">{post.title}</h3>
            <p className="text-neutral-300 text-sm mt-2 line-clamp-2">{post.body}</p>
            <div className="text-xs text-neutral-400 mt-3">
              {post.user.name} · {date} · {post._count.replies} replies
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}