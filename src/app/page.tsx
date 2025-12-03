
import EventCard from '@/components/EventCard';
import Link from 'next/link';

// Временные mock-данные из-за проблем с Prisma в этой среде
type Event = {
  id: string;
  title: string;
  date: Date;
  location: string;
  type: 'TOURNAMENT' | 'CERTIFICATION';
};

const events: Event[] = [
  {
    id: '1',
    title: 'Всероссийский турнир по самбо "Надежды России"',
    date: new Date('2024-12-20T10:00:00Z'),
    location: 'г. Москва, МЦБИ',
    type: 'TOURNAMENT',
  },
  {
    id: '2',
    title: 'Аттестационный семинар по айкидо под руководством...',
    date: new Date('2024-11-25T12:00:00Z'),
    location: 'г. Санкт-Петербург, Федерация Айкидо',
    type: 'CERTIFICATION',
  },
  {
    id: '3',
    title: 'Чемпионат России по боксу среди юниоров',
    date: new Date('2025-01-18T09:00:00Z'),
    location: 'г. Казань, "Центр Бокса"',
    type: 'TOURNAMENT',
  },
];

export default async function Home() {

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Глубокий фон */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-gray-900 to-black"></div>

      {/* Шапка — как у госпортала */}
      <header className="border-b border-red-900/40 backdrop-blur-md bg-black/60 sticky top-0 z-50">
        <div className="px-6 lg:px-10 py-5 flex flex-col sm:flex-row sm:items-center justify-between max-w-7xl mx-auto">
          {/* Название без логотипа */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white font-sans">
              Dem_Platform
            </h1>
            <p className="text-red-400 text-sm mt-1">
              Платформа Министерства спорта РФ
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link
              href="/dashboard"
              className="text-sm border border-red-600 px-4 py-2 rounded text-red-100 hover:bg-red-600 hover:text-black transition"
            >
              Личный кабинет
            </Link>
            <Link
              href="/events/create"
              className="text-sm bg-gradient-to-r from-red-700 to-red-800 px-5 py-2 rounded text-white hover:from-red-600 hover:to-red-700 transition font-medium"
            >
              ➕ Создать событие
            </Link>
          </div>
        </div>
      </header>

      {/* Главный блок */}
      <main className="px-6 lg:px-10 py-12 max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Официальные соревнования и аттестации
          </h2>
          <p className="text-gray-400 text-base max-w-3xl mx-auto">
            Единая система учёта турниров и присвоения разрядов по видам единоборств в Российской Федерации
          </p>
        </div>

        {/* Линия-разделитель с флаговыми цветами */}
        <div className="h-1.5 w-full bg-gradient-to-r from-white via-blue-500 to-red-600 mb-12 rounded-full"></div>

        {/* Статистика (стиль: как на госпорталах) */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 text-center mb-14">
          {[
            { value: '256+', label: 'Спортивных клубов' },
            { value: '18+', label: 'Региональных федераций' },
            { value: '420+', label: 'Проведённых турниров' },
            { value: '98%', label: 'Одобрение тренеров' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-lg p-4"
            >
              <div className="text-2xl font-black text-red-400">{stat.value}</div>
              <div className="text-gray-400 text-xs mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* События */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Ближайшие события</h3>
          <Link
            href="/calendar"
            className="text-red-400 text-sm hover:underline"
          >
            Полный календарь →
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-red-900/20">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">Нет запланированных мероприятий</p>
            <p className="text-gray-500 text-sm mt-2">Ожидается обновление календаря</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="group bg-gray-900/70 border border-red-900/30 rounded-lg overflow-hidden transition hover:border-red-500/60 hover:shadow-lg hover:shadow-red-500/10"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Футер — официальный */}
      <footer className="px-6 lg:px-10 py-8 border-t border-red-900/30 text-center text-gray-600 text-xs bg-black/50">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="text-white text-sm font-medium">Dem_Platform</p>
          <p>Официальная платформа для организации соревнований по единоборствам в РФ</p>
          <p>Разработка и поддержка: Демьяненко Алексей • 
            <Link
              href="https://vk.com/kempo30"
              target="_blank"
              className="text-red-400 hover:underline mx-1"
            >
              VK: kempo30
            </Link>
          </p>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Министерство спорта Российской Федерации</p>
        </div>
      </footer>
    </div>
  );
}
