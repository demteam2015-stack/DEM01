'use client';
import type { Tournament } from '@/lib/db';

export function ExportToCalendar({ event }: { event: Tournament }) {
  const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${new Date(event.date).toISOString().replace(/-|:|\.\d+/g, '')}
DTEND:${new Date(event.date).toISOString().replace(/-|:|\.\d+/g, '')}
DESCRIPTION:Турнир
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

  const download = () => {
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={download}
      className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
    >
      📥 Добавить в календарь
    </button>
  );
}
