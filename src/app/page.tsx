import { prisma } from '@/lib/db';
import EventCard from '@/components/EventCard';
import { DemTeamLogo } from '@/components/logo';
import Link from 'next/link';

export default async function Home() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
  });

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Глубокий фон с текстурой */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:30px_30px] opacity-5"></div>

      {/* Шапка — красивая, с прозрачностью */}
      <header className="relative z-10 border-b border-gray-800/70 backdrop-blur-xl bg-black/40 sticky top-0">
        <div className="px-6 lg:px-10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <DemTeamLogo className="text-red-500" />
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white font-sans">
                Dem_Platform
              </h1>
              <p className="text-gray-400 text-xs md:text-sm">
                Управление турнирами и аттестациями
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/events/create"
              className="text-xs font-medium text-red-400 hover:text-red-300 transition"
            >
              ➕ Создать событие
            </Link>
            <Link
              href="/login"
              className="text-xs border border-red-500/50 px-4 py-1.5 rounded-full text-red-300 hover:bg-red-500 hover:text-black transition"
            >
              Войти
            </Link>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="px-6 lg:px-10 py-12 max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Ближайшие события
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Турниры и аттестации по единоборствам — все в одном месте
          </p>
        </div>

        {/* Сетка событий */}
        {events.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/40 rounded-2xl border border-gray-800">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">Нет запланированных событий</p>
            <p className="text-gray-500 text-sm mt-2">Создайте первое соревнование</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-red-500/50 rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Футер */}
      <footer className="px-6 lg:px-10 py-8 border-t border-gray-800 text-center text-gray-600 text-xs">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-medium text-white">Dem_Platform</span>. 
          Все права защищены.
        </p>
        <p className="mt-1">
          Создатель: 
          <Link
            href="https://vk.com/kempo30"
            target="_blank"
            className="text-red-400 hover:underline mx-1"
          >
            Демьяненко Алексей
          </Link>
          (VK: kempo30)
        </p>
      </footer>
    </div>
  );
}