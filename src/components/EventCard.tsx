import Link from "next/link";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { Tournament } from "@/lib/tournaments-api";

export default function EventCard({ event }: { event: Tournament }) {
  const isTournament = event.status !== 'completed'; // A simple way to differentiate, can be improved
  const date = new Date(event.date);

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform transition hover:scale-105 hover:shadow-red-500/20 border border-gray-700">
      {/* Баннер события */}
      <div className={`py-4 text-center font-bold uppercase text-white ${isTournament ? "bg-gradient-to-r from-red-700 to-red-900" : "bg-gradient-to-r from-blue-700 to-blue-900"}`}>
        {isTournament ? "🏆 Турнир" : "📜 Аттестация"}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black text-white mb-4 line-clamp-2">{event.title}</h3>
        
        <div className="space-y-3 text-gray-300">
          <p className="flex items-center">
            <span className="text-red-500 mr-3">📅</span>
            {format(date, "dd MMMM yyyy", { locale: ru })}
          </p>
          <p className="flex items-center">
            <span className="text-red-500 mr-3">📍</span>
            {event.location}
          </p>
          <p className="flex items-center">
            <span className="text-red-500 mr-3">🥋</span>
            {event.discipline}
          </p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {event.registeredCount} / {event.maxParticipants} участников
          </span>
          <Link
            href={`/events/${event.id}`}
            className="text-red-500 font-bold text-sm hover:underline"
          >
            Подробнее →
          </Link>
        </div>
      </div>
    </div>
  );
}
