"use client";
import { useRouter } from "next/navigation";

export default function NewThreadPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white px-6 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-semibold mb-4">Forum</h1>
        <p className="text-neutral-300 mb-8">New thread creation is coming soon!</p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2 rounded bg-white/10 hover:bg-white/20 transition"
        >
          Go back
        </button>
      </div>
    </main>
  );
}