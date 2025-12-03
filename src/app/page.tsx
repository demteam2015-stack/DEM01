'use server';

import Link from 'next/link';
import EventCard from '@/components/EventCard';

// Mock data to simulate Prisma response
const events = [
  // {
  //   id: '1',
  //   title: 'Открытый турнир по ММА',
  //   sport: 'MMA',
  //   date: new Date('2024-09-15T09:00:00'),
  //   status: 'OPEN',
  // },
  // {
  //   id: '2',
  //   title: 'Чемпионат по боксу',
  //   sport: 'BOXING',
  //   date: new Date('2024-10-20T10:00:00'),
  //   status: 'OPEN',
  // },
  // {
  //   id: '3',
  //   title: 'Семинар по грэпплингу',
  //   sport: 'BJJ',
  //   date: new Date('2024-08-25T14:00:00'),
  //   status: 'COMPLETED',
  // },
];

export default async function Home() {
  // const events = await prisma.event.findMany({
  //   orderBy: { date: 'asc' },
  // });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-red-950 text-white">
      {/* Градиентный фоновый эффект */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Шапка */}
      <header className="relative z-10 px-6 py-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-yellow-300 to-red-400">
          FIGHT<span className="text-white">HUB</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          Единая платформа для проведения турниров и аттестаций по единоборствам
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/events">
            <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition transform hover:scale-105 shadow-lg">
              🥊 Все события
            </button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-3 border border-gray-600 hover:border-red-500 text-gray-300 hover:text-white font-semibold rounded-full transition backdrop-blur-sm bg-black/20">
              ℹ️ Как работает?
            </button>
          </Link>
        </div>
      </header>

      {/* Основной контент */}
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Ближайшие соревнования
          </h2>

          {events.length === 0 ? (
            <div className="text-center mt-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-3xl">📅</span>
              </div>
              <p className="text-gray-400 text-lg">
                Пока нет запланированных событий.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Следите за новостями — скоро начнётся регистрация!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Подвал */}
      <footer className="relative z-10 py-6 text-center text-gray-600 text-sm border-t border-gray-800">
        <p>
          &copy; {new Date().getFullYear()} FIGHTHUB. Создано с ❤️ для бойцов.
        </p>
      </footer>
    </div>
  );
}