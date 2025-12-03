import Link from 'next/link';
import type { Tournament } from '@/lib/tournaments-api';

export default function TournamentCard({ tournament }: { tournament: Tournament }) {
  const { id, title, discipline, date, location, status } = tournament;

  const statusText =
    status === 'registration_open' ? 'Регистрация открыта' :
    status === 'upcoming' ? 'Скоро' : 'Завершён';

  const statusColor =
    status === 'registration_open' ? 'bg-green-900 text-green-200' :
    status === 'upcoming' ? 'bg-blue-900 text-blue-200' : 'bg-gray-700 text-gray-300';

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-red-600 transition">
      <div
        className={`h-1 ${
          discipline === 'MMA' ? 'bg-red-600' :
          discipline === 'Boxing' ? 'bg-yellow-600' :
          discipline === 'Judo' ? 'bg-blue-600' :
          'bg-purple-600'
        }`}
      ></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
        <p className="text-red-400 font-semibold mt-1">{discipline}</p>
        <p className="text-slate-300 text-sm mt-2">📅 {new Date(date).toLocaleDateString('ru-RU')}</p>
        <p className="text-slate-400 text-sm">📍 {location}</p>
        <span className={`inline-block mt-4 px-3 py-1 text-xs font-bold rounded-full ${statusColor}`}>
          {statusText}
        </span>
      </div>
      <div className="bg-slate-900 px-6 py-4 border-t border-slate-700">
        <Link href={`/events/${id}`}>
          <button className="w-full py-2 text-center text-red-400 font-semibold hover:text-red-300 transition text-sm">
            Подробнее →
          </button>
        </Link>
      </div>
    </div>
  );
}