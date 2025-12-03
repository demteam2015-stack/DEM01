import Link from "next/link";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { Event } from "@prisma/client";

export default function EventCard({ event }: { event: Event }) {
  const isTournament = event.type !== 'CERTIFICATION';
  const date = new Date(event.date);

  return (
    <>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 py-1.5 text-center text-xs font-bold uppercase text-white rounded-b-lg ${isTournament ? "bg-red-700" : "bg-blue-700"}`}>
        {isTournament ? "🏆 Турнир" : "📜 Аттестация"}
      </div>

      <div className="pt-10">
        <h3 className="text-lg font-black text-white mb-4 line-clamp-2 h-14">{event.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            <span className="text-red-500">📅</span>
            {format(date, "dd MMMM yyyy", { locale: ru })}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-red-500">📍</span>
            {event.location}
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <Link
            href={`/events/${event.id}`}
            className="text-red-400 font-bold text-xs hover:underline"
          >
            Подробнее →
          </Link>
        </div>
      </div>
    </>
  );
}