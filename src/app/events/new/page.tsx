"use client";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get("title"),
      description: fd.get("description"),
      location: fd.get("location"),
      start: new Date(fd.get("start") as string).toISOString(),
      end: new Date(fd.get("end") as string).toISOString(),
      approved: true,          // change to false if you want moderator approval
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) router.push("/events");
    else alert("Error creating event");
  }

  const now = new Date().toISOString().slice(0, 16); // local datetime-local default

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Create New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" required placeholder="Event title" className="w-full rounded bg-white/10 border border-white/20 px-4 py-2" />
          <textarea name="description" required placeholder="Description" rows={4} className="w-full rounded bg-white/10 border border-white/20 px-4 py-2" />
          <input name="location" required placeholder="Location" className="w-full rounded bg-white/10 border border-white/20 px-4 py-2" />
          <label className="block text-sm">Start</label>
          <input name="start" type="datetime-local" required defaultValue={now} className="w-full rounded bg-white/10 border border-white/20 px-4 py-2" />
          <label className="block text-sm">End</label>
          <input name="end" type="datetime-local" required defaultValue={now} className="w-full rounded bg-white/10 border border-white/20 px-4 py-2" />
          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition">Create</button>
            <button type="button" onClick={() => router.back()} className="px-5 py-2 rounded bg-white/10 hover:bg-white/20 transition">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}