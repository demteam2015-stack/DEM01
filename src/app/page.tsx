import EventCard from '@/components/EventCard';
import { DemTeamLogo } from '@/components/logo';
import { getAllTournaments } from '@/lib/tournaments-api';
import type { Tournament } from '@/lib/tournaments-api';
import Link from 'next/link';

export default async function Home() {
  // Получаем все события из базы
  const events = await getAllTournaments();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Шапка — тёмная, мощная, как у UFC */}
      <header className="border-b border-gray-800 py-6 text-center backdrop-blur-sm bg-black/40">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <DemTeamLogo className="text-red-600" />
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-red-600 font-sans">
            Dem_Platform
          </h1>
        </div>
        <p className="text-gray-300 text-sm md:text-base">
          Система управления соревнованиями и аттестациями
        </p>
      </header>

      {/* Основной контент */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
            Ближайшие события
          </h2>
          <p className="text-gray-400 text-center text-sm mb-8">
            Турниры и аттестации по единоборствам
          </p>

          {events.length === 0 ? (
            <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-gray-400 text-lg">
                Пока нет запланированных турниров или аттестаций.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Организуйте первое соревнование уже сегодня
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event: Tournament) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Футер — простой и чистый */}
      <footer className="py-6 text-center text-gray-500 text-xs border-t border-gray-800">
        <p>
          &copy; {new Date().getFullYear()} Dem_Platform. Все права защищены.
        </p>
        <p className="mt-1">
          Создатель:{' '}
          <Link
            href="https://vk.com/kempo30"
            target="_blank"
            className="text-red-500 hover:underline transition"
          >
            Демьяненко Алексей (VK: kempo30)
          </Link>
        </p>
      </footer>
    </div>
  );
}
