import Link from 'next/link';
import type { Tournament } from '@/lib/tournaments-api';

export default function TournamentCard({ tournament }: { tournament: Tournament }) {
  const { id, title, discipline, date, location, status } = tournament;

  const statusConfig = {
    registration_open: {
      label: 'РЕГИСТРАЦИЯ ОТКРЫТА',
      bg: 'bg-green-900/40 border-green-700',
      text: 'text-green-300',
      pulse: 'animate-pulse',
    },
    upcoming: {
      label: 'СКОРО',
      bg: 'bg-blue-900/40 border-blue-700',
      text: 'text-blue-300',
      pulse: '',
    },
    completed: {
      label: 'ЗАВЕРШЁН',
      bg: 'bg-gray-800 border-gray-600',
      text: 'text-gray-400',
      pulse: '',
    },
  };

  const config = statusConfig[status] || statusConfig.upcoming;

  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 hover:border-red-600 transition group">
      {/* Спорт-индикатор */}
      <div
        className={`h-2 ${
          discipline === 'MMA' ? 'bg-gradient-to-r from-red-600 to-yellow-600' :
          discipline === 'Boxing' ? 'bg-yellow-600' :
          discipline === 'Judo' ? 'bg-blue-600' :
          discipline === 'BJJ' ? 'bg-purple-600' : 'bg-gray-600'
        }`}
      ></div>

      <div className="p-6">
        <h3 className="text-xl font-black text-white leading-tight group-hover:text-red-300 transition">
          {title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="px-2.5 py-1 bg-slate-800 rounded text-red-400 font-bold uppercase tracking-wide">
            {discipline}
          </span>
          <span className="text-slate-400">📍 {location}</span>
        </div>

        <div className="mt-4 text-slate-300 text-sm font-mono flex items-center gap-1">
          📅 {formattedDate}
        </div>

        {/* Status */}
        <div className={`mt-5 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded border ${config.bg} ${config.text} ${config.pulse} inline-block`}>
          {config.label}
        </div>
      </div>

      {/* Кнопка внизу */}
      <div className="bg-slate-950 px-6 py-5 border-t border-slate-800">
        <Link href={`/events/${id}`}>
          <button className="w-full py-2.5 text-sm font-bold text-red-400 hover:text-yellow-300 transition text-center border border-red-900/40 rounded group-hover:bg-red-900/10">
            ПОДРОБНЕЕ →
          </button>
        </Link>
      </div>
    </div>
  );
}
