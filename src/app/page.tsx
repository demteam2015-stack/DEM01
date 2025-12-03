import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getTournaments } from '@/lib/tournaments-api';
import TournamentCard from '@/components/TournamentCard';

export default async function Home() {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const organizerId = session?.user?.id;
  const tournaments = organizerId ? await getTournaments(organizerId) : [];

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800">
          <h2 className="text-3xl font-black text-red-500">🔐 ДОСТУП ОГРАНИЧЕН</h2>
          <p className="text-slate-400 mt-4 max-w-sm">
            Это панель управления для организаторов. Пожалуйста, войдите в свою учётную запись, чтобы управлять турнирами.
          </p>
          <a
            href="/login"
            className="mt-8 inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 font-bold text-lg rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            ВОЙТИ
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Абстрактные блики */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-t from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Video Hero Background (имитация) */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-gradient-to-b from-red-900/30 to-black"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <header className="px-8 lg:px-16 py-6 flex justify-between items-center border-b border-red-900/30 backdrop-blur-md bg-black/60">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-600 rounded-full shadow-lg animate-ping"></div>
            <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-red-500">
              FIGHTHUB
            </span>
          </div>

          <nav className="hidden md:flex space-x-10 text-sm font-medium tracking-wide">
            <a href="/events" className="hover:text-red-400 transition duration-200 border-b-2 border-transparent hover:border-red-500 pb-1">
              ТУРНИРЫ
            </a>
            <a href="/judges" className="hover:text-red-400 transition duration-200 border-b-2 border-transparent hover:border-yellow-500 pb-1">
              СУДЬИ
            </a>
            <a href="/certificates" className="hover:text-red-400 transition duration-200 border-b-2 border-transparent hover:border-blue-500 pb-1">
              СЕРТИФИКАТЫ
            </a>
          </nav>
          
          <div className='flex items-center gap-4'>
            <span className='text-sm text-slate-300'>Добро пожаловать, {session.user?.name}</span>
             <a href="/api/auth/signout" className="px-6 py-2.5 bg-gradient-to-r from-yellow-700 to-yellow-800 hover:from-yellow-600 hover:to-yellow-700 text-sm font-bold rounded-lg transition transform hover:scale-105 shadow-lg">
                ВЫЙТИ
              </a>
          </div>

        </header>

        {/* Hero Section */}
        <section className="px-8 lg:px-16 py-20 text-center relative">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter">
              ПАНЕЛЬ
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 mt-2">
                ОРГАНИЗАТОРА
              </span>
            </h1>
            <p className="text-slate-300 mt-8 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Интегрированная система управления соревнованиями по MMA, боксу, дзюдо, БЖЖ.  
              Регистрация, жеребьёвка, судейство, сертификация — всё в одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-14">
              <a
                href="/events"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 font-extrabold text-lg rounded-xl transition transform hover:scale-105 shadow-2xl"
              >
                🏆 ВСЕ СОРЕВНОВАНИЯ
              </a>
              <a
                href="/create"
                className="px-8 py-4 border-2 border-red-600 hover:border-yellow-500 text-red-100 hover:text-yellow-100 font-bold text-lg rounded-xl transition transform hover:scale-105 backdrop-blur-sm bg-red-900/20"
              >
                ➕ СОЗДАТЬ ТУРНИР
              </a>
            </div>
          </div>
        </section>

        {/* Stats Bar (как у UFC) */}
        <section className="px-8 lg:px-16 py-4 bg-gradient-to-r from-red-900/40 to-yellow-900/40 border-y border-red-800/30">
          <div className="flex flex-col md:flex-row justify-around text-center text-sm md:text-base font-mono">
            <div><span className="text-yellow-400">256</span> участников</div>
            <div><span className="text-red-400">18</span> турниров</div>
            <div><span className="text-blue-400">42</span> боёв проведено</div>
            <div><span className="text-green-400">98%</span> удовлетворённость</div>
          </div>
        </section>

        {/* Tournaments Grid */}
        <section className="px-8 lg:px-16 py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-tight">
            ВАШИ ТУРНИРЫ
          </h2>

          {tournaments.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center border-2 border-red-900/40">
                <span className="text-4xl">📅</span>
              </div>
              <p className="text-slate-500 text-xl">У вас нет запланированных турниров</p>
              <p className="text-slate-600 text-sm mt-2">Организуйте первое соревнование уже сегодня</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto">
              {tournaments.map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="px-8 lg:px-16 py-10 border-t border-slate-800 text-center text-sm text-slate-600 space-y-4">
          <div className="flex flex-wrap justify-center gap-8">
            <a href="/about" className="hover:text-red-400 transition">О платформе</a>
            <a href="/docs" className="hover:text-red-400 transition">Документация</a>
            <a href="/contact" className="hover:text-red-400 transition">Контакты</a>
            <a href="/privacy" className="hover:text-red-400 transition">Конфиденциальность</a>
          </div>
          <p className="text-slate-700">
            &copy; {new Date().getFullYear()} FIGHTHUB. Разработано с использованием современных веб-технологий.
          </p>
        </footer>
      </div>
    </div>
  );
}
