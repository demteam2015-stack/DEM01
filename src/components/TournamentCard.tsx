import Link from "next/link";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { Tournament } from "@/lib/tournaments-api";

export default function TournamentCard({ tournament }: { tournament: Tournament }) {
  const type = tournament.discipline === 'Certification' ? 'certification' : 'tournament';

  return (
    <Link href={`/tournaments/${tournament.id}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-red-600 transition group">
        <div className={`py-3 text-center text-xs font-black uppercase tracking-wider text-white ${type === "tournament" ? "bg-red-700" : "bg-gray-700"}`}>
          {type === "tournament" ? "БОЙ" : "АТТЕСТАЦИЯ"}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-black uppercase tracking-wide text-white group-hover:text-red-400 transition line-clamp-2">
            {tournament.title}
          </h3>
          <div className="mt-4 space-y-2 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Дата</span>
              <span className="text-white font-mono">{format(new Date(tournament.date), "dd.MM.yy", { locale: ru })}</span>
            </div>
            <div className="flex justify-between">
              <span>Место</span>
              <span className="text-white">{tournament.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Участники</span>
              <span className="text-white">{tournament.registeredCount}/{tournament.maxParticipants}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
