import Link from "next/link";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

type Event = {
  id: string;
  title: string;
  date: Date;
  location: string;
  type: 'TOURNAMENT' | 'CERTIFICATION';
};

export default function EventCard({ event }: { event: Event }) {
  const isTournament = event.type === 'TOURNAMENT';
  const date = new Date(event.date);

  return (
    <>
      <div className={`py-2 text-center text-xs font-bold uppercase text-white ${isTournament ? "bg-red-700/80" : "bg-blue-700/80"}`}>
        {isTournament ? "🏆 Турнир" : "📜 Аттестация"}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-white mb-4 line-clamp-2 h-14 group-hover:text-red-400 transition">
          {event.title}
        </h3>
        
        <div className="space-y-3 text-sm text-gray-400">
          <p className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">📅</span>
            <span>{format(date, "dd MMMM yyyy 'в' HH:mm", { locale: ru })}</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">📍</span>
            <span>{event.location}</span>
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href={`/events/${event.id}`}
            className="text-red-400 font-bold text-xs hover:underline"
          >
            Подробнее и регистрация →
          </Link>
        </div>
      </div>
    </>
  );
}
