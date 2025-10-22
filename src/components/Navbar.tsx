"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          Campus Connect
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
          <Link href="/events">Events</Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/forum">Forum</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/login">Login</Link>
        </div>

        <button className="md:hidden text-neutral-300">☰</button>
      </nav>
    </header>
  );
}