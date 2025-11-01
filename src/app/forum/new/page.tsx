"use client";
import { useRouter } from "next/navigation";

export default function NewThreadPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      title: fd.get("title"),
      body: fd.get("body"),
      userId: "placeholder_user_id", // TODO: replace after auth
    };

    const res = await fetch("/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) router.push("/forum");
    else alert("Error creating thread");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">New Thread</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" required placeholder="Thread title" className="w-full rounded bg-white/10 border border-white/20 px-4 py-2" />
          <textarea name="body" required placeholder="Write your post..." rows={6} className="w-full rounded bg-white/10 border border-white/20 px-4 py-2" />
          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition">Post</button>
            <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded bg-white/10 hover:bg-white/20 transition">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}