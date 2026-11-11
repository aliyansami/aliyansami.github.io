import { profile } from "../data/content";

/** Calendar glyph that flips its page on hover. */
export function CalendarIcon() {
  return (
    <svg className="cal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path className="cal-tick" d="M9 15.5l2 2 4-4" />
    </svg>
  );
}

/** "Book a call" button that opens the Google Calendar booking page in a new tab. */
export default function BookCall({ className = "btn btn-accent", label = "Book a 15-min call" }: { className?: string; label?: string }) {
  return (
    <a className={`book-call ${className}`} href={profile.booking} target="_blank" rel="noreferrer">
      <CalendarIcon />
      {label}
    </a>
  );
}
