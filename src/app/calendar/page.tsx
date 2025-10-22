"use client";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Navigate } from "react-big-calendar";
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
            style={{ height: 600 }}
            eventPropGetter={() => ({ className: "cal-event" })}
            components={{
              toolbar: (props) => (
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => props.onNavigate(Navigate.PREVIOUS)} className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition text-neutral-200">‹ Prev</button>
                  <span className="text-lg font-medium tracking-tight">{props.label}</span>
                  <button onClick={() => props.onNavigate(Navigate.NEXT)} className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 transition text-neutral-200">Next ›</button>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </main>
  );
}