
'use client';

import type { Fighter } from "@/lib/fighters-api";
import { getFighters } from "@/lib/fighters-api";
import type { Tournament } from "@/lib/tournaments-api";
import { getAllTournaments } from "@/lib/tournaments-api";
import { useEffect, useState } from "react";

export default function RankingPage() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fightersData = await getFighters();
      const tournamentsData = await getAllTournaments();
      setFighters(fightersData);
      setTournaments(tournamentsData);
    }
    fetchData();
  }, []);

  // Пример: рейтинг по дисциплинам
  const disciplines = ["Кекусин", "Карате", "Бокс", "ММА", "Тхэквондо", "BJJ", "Judo"];

  // Группируем бойцов по дисциплинам (упрощённо)
  const rankedByDiscipline = disciplines.map((discipline) => {
    return {
      discipline,
      leaders: fighters
        .filter((f) => f.discipline === discipline)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5),
    };
  });

  // Статистика для организаторов
  const totalFighters = fighters.length;
  const totalTournaments = tournaments.filter(t => t.status === "completed").length;
  const totalCertifications = 5; // Placeholder

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Шапка */}
      <header className="bg-gray-900 border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-black uppercase tracking-wider bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Рейтинг Бойцов
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            Объективная система оценки мастерства по всем дисциплинам
          </p>
        </div>
      </header>

      {/* Основной контент */}
      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Статистика (для организаторов) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <div className="text-4xl font-black text-red-500">{totalFighters}</div>
              <div className="text-gray-300 font-semibold">Активных бойцов</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <div className="text-4xl font-black text-blue-500">{totalTournaments}</div>
              <div className="text-gray-300 font-semibold">Турниров проведено</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <div className="text-4xl font-black text-green-500">{totalCertifications}</div>
              <div className="text-gray-300 font-semibold">Аттестаций пройдено</div>
            </div>
          </section>

          {/* Рейтинги по дисциплинам */}
          {rankedByDiscipline.map(({ discipline, leaders }) => (
            <section key={discipline} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <span className="inline-block w-2 h-8 bg-red-600 rounded-r-lg mr-4"></span>
                {discipline}
              </h2>

              {leaders.length === 0 ? (
                <p className="text-gray-500">Нет данных для этой дисциплины</p>
              ) : (
                <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-900 border-b border-gray-700">
                        <th className="py-4 px-6 font-bold text-red-400">Место</th>
                        <th className="py-4 px-6 font-bold">Имя</th>
                        <th className="py-4 px-6 font-bold">Клуб</th>
                        <th className="py-4 px-6 font-bold">Возраст</th>
                        <th className="py-4 px-6 font-bold text-right">Рейтинг</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaders.map((fighter, idx) => (
                        <tr
                          key={fighter.id}
                          className={`border-b border-gray-700 hover:bg-gray-700 transition ${idx === 0 ? "bg-gradient-to-r from-yellow-900/30 to-transparent" : ""}`}
                        >
                          <td className="py-4 px-6 font-black text-lg">
                            {idx === 0 && "🥇"}
                            {idx === 1 && "🥈"}
                            {idx === 2 && "🥉"}
                            {idx > 2 && <span className="text-gray-500">{idx + 1}</span>}
                          </td>
                          <td className="py-4 px-6 font-semibold">{fighter.name}</td>
                          <td className="py-4 px-6 text-gray-300">{fighter.club}</td>
                          <td className="py-4 px-6 text-gray-400">{fighter.age}</td>
                          <td className="py-4 px-6 text-right font-bold text-red-400">{fighter.rating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* Призыв к участию */}
          <section className="text-center mt-20 py-12 bg-gradient-to-r from-red-900/20 to-black border border-red-900/30 rounded-3xl">
            <h2 className="text-4xl font-black mb-4">Хочешь попасть в рейтинг?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Участвуй в турнирах и аттестациях — набирай очки и поднимайся в таблице
            </p>
            <div className="space-x-6">
              <a
                href="/events"
                className="inline-block bg-red-600 hover:bg-red-700 px-8 py-4 font-bold uppercase tracking-wider"
              >
                Зарегистрироваться на турнир
              </a>
              <a
                href="/profile"
                className="inline-block border-2 border-gray-400 hover:border-white px-8 py-4 font-semibold uppercase tracking-wider"
              >
                Личный кабинет
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Подвал */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Fight Platform. Рейтинг обновляется автоматически после каждого события.</p>
      </footer>
    </div>
  );
}
