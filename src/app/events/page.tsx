"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  location: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">Upcoming Events</h1>
          <Link href="/events/new" className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition">
            + Create Event
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <GlassEventCard key={ev.id} event={ev} />
          ))}
        </div>
      </div>
    </main>
  );
}

function GlassEventCard({ event }: { event: Event }) {
  const start = new Date(event.start);
  const end = new Date(event.end);
  const dateStr = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const timeStr = `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:shadow-lg transition flex flex-col">
      <h3 className="text-lg font-semibold text-white">{event.title}</h3>
      <p className="mt-2 text-neutral-300 text-sm flex-1">{event.description}</p>
      <div className="mt-4 text-xs text-neutral-400 space-y-1">
        <p>{dateStr} • {timeStr}</p>
        <p>📍 {event.location}</p>
      </div>
      <Link href={`/events/${event.id}`} className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition">
        View details →
      </Link>
    </div>
  );
}