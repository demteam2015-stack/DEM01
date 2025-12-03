'use client';

import { getTournaments } from '@/lib/tournaments-api';
import TournamentCard from '@/components/TournamentCard';
import { useEffect, useState } from 'react';
import type { Tournament } from '@/lib/tournaments-api';

export default function Home() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    async function loadTournaments() {
      const data = await getTournaments();
      setTournaments(data);
    }
    loadTournaments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white">
      {/* Абстрактные фоны */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-8 py-6 flex justify-between items-center border-b border-slate-800 backdrop-blur-md bg-black/40">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400">
              FIGHTHUB
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm">
            <a href="/events" className="hover:text-red-400 transition">Турниры</a>
            <a href="/rules" className="hover:text-red-400 transition">Правила</a>
            <a href="/contact" className="hover:text-red-400 transition">Контакты</a>
          </nav>
          <button className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-semibold transition">
            Войти
          </button>
        </header>

        {/* Hero */}
        <section className="px-8 py-16 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Организация <span className="text-red-500">турниров</span> по единоборствам
          </h1>
          <p className="text-slate-300 mt-6 text-lg leading-relaxed">
            Платформа для проведения соревнований по MMA, боксу, дзюдо, БЖЖ.  
            Регистрация, распределение по весовым категориям, жеребьёвка, сертификаты.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="/events" className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition text-center">
              🏆 Посмотреть турниры
            </a>
            <a href="/create" className="px-8 py-3 border border-slate-600 hover:border-red-500 rounded-lg font-semibold transition text-center backdrop-blur-sm bg-white/5">
              ➕ Создать турнир
            </a>
          </div>
        </section>

        {/* Tournaments */}
        <section className="px-8 pb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Ближайшие соревнования</h2>
          {tournaments.length === 0 ? (
            <p className="text-center text-slate-500">Нет запланированных турниров.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {tournaments.map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} FIGHTHUB. Система управления турнирами.</p>
        </footer>
      </div>
    </div>
  );
}