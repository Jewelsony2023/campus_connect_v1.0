// src\app\calendar\page.tsx
"use client";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./cal-overrides.css";

const localizer = momentLocalizer(moment);

type CalEvent = { id: string; title: string; start: Date; end: Date };

export default function CalendarPage() {
  const [events, setEvents] = useState<CalEvent[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) =>
        setEvents(
          data.map((ev: any) => ({
            id: ev.id,
            title: ev.title,
            start: new Date(ev.start),
            end: new Date(ev.end),
          }))
        )
      );
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight mb-8">Event Calendar</h1>
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-2xl">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={() => ({ className: "cal-event" })}
          />
        </div>
      </div>
    </main>
  );
}