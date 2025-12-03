
'use client';

import Link from 'next/link';
import React, { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Shield, Zap } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import type { Tournament } from '@/lib/tournaments-api';
import TournamentCard from '@/components/TournamentCard';

// --- STUB COMPONENTS ---
// These are placeholder components to avoid errors.
// You can implement them with your actual logic.

const DemTeamLogo = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M22 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const ThemeToggleButton = () => (
  <Button size="icon" variant="ghost">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  </Button>
);

const useUser = () => ({
  user: null, // Stub: No user logged in by default
  userData: null,
  isUserLoading: false,
});

const useToast = () => ({
  toast: ({ title, description }: { title: string, description: string }) => {
    console.log(`TOAST: ${title} - ${description}`);
  },
});

// This is a workaround to make the client component work with our localStorage adapter
// We need to re-import the function to make it available on the client
const getTournaments = async (): Promise<Tournament[]> => {
    if (typeof window !== 'undefined') {
        const { getAllTournaments: fetchAll } = await import('@/lib/tournaments-api');
        return await fetchAll();
    }
    return [];
}
// --- END STUB COMPONENTS ---


function HomePageContent() {
  const { user, userData, isUserLoading } = useUser();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const canCreateTournament = userData?.role === 'Администратор' || userData?.role === 'Организатор';

  useEffect(() => {
    async function loadTournaments() {
      try {
        const data = await getTournaments();
        setTournaments(data);
      } catch (e) {
        console.error('Failed to load tournaments', e);
      }
    }
    loadTournaments();
  }, []);

  useEffect(() => {
    if (searchParams.has('clear_cache')) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/?cache_cleared=true';
    }

    if (searchParams.has('cache_cleared')) {
      toast({
        title: 'Кэш успешно очищен',
        description: 'Все локальные данные были удалены.',
      });
      window.history.replaceState(null, '', '/');
    }
  }, [searchParams, toast]);

  const isAuthenticated = !isUserLoading && !!user;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Глубокий фон с многослойными градиентами */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-black"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-l from-red-700/20 to-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-t from-purple-900/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-600/10 to-transparent rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Сетка-фон (тонкая решётка) */}
      <div
        className="absolute inset-0 -z-10 opacity-5 bg-repeat"
        style={{
          backgroundImage: `
            linear-gradient(rgba(136, 16, 16, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(136, 16, 16, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Контент */}
      <div className="relative">
        {/* Шапка */}
        <header className="px-8 lg:px-16 py-6 flex justify-between items-center border-b border-red-900/30 backdrop-blur-lg bg-black/40 sticky top-0 z-50">
          <Link href="/" className="group flex items-center space-x-3">
            <DemTeamLogo className="text-red-500" />
            <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 font-sans">
              FightRank Pro
            </span>
          </Link>

          <nav className="hidden md:flex space-x-10 text-sm font-medium uppercase tracking-wider">
            <Link
              href="/dashboard/tournaments"
              className="hover:text-yellow-400 transition duration-300 border-b border-transparent hover:border-yellow-500 pb-1 group"
            >
              Турниры
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500"></span>
            </Link>
            <Link
              href="/dashboard/judging"
              className="hover:text-yellow-400 transition duration-300 border-b border-transparent hover:border-yellow-500 pb-1 group"
            >
              Судейство
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500"></span>
            </Link>
            <Link
              href="/updates"
              className="hover:text-yellow-400 transition duration-300 border-b border-transparent hover:border-yellow-500 pb-1 group"
            >
              Обновления
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {isAuthenticated ? (
              <Button
                asChild
                className="px-5 py-2 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-xs font-bold rounded-lg transition-all hover:scale-105 hover:shadow-2xl shadow-red-900/30 border border-red-900/40"
              >
                <Link href="/dashboard">Панель управления</Link>
              </Button>
            ) : (
              <Button
                asChild
                className="px-5 py-2 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-xs font-bold rounded-lg transition-all hover:scale-105 hover:shadow-2xl shadow-red-900/30 border border-red-900/40"
              >
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </header>

        {/* Герой-секция */}
        <section className="px-8 lg:px-16 py-24 text-center relative">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 mb-4 font-sans">
              FightRank Pro
            </h1>
            <p className="text-red-300 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed mb-10 font-light">
              Платформа нового поколения для организации турниров по единоборствам.  
              От регистрации до финального удара — всё под контролем.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 font-extrabold text-lg rounded-xl transition-all hover:scale-105 hover:shadow-2xl shadow-red-900/40 uppercase tracking-wide"
              >
                <Link href={isAuthenticated ? '/dashboard' : '/signup'}>
                  <Zap className="w-5 h-5 mr-2" /> Начать сейчас
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 border-2 border-yellow-600 text-yellow-100 hover:bg-yellow-600 hover:text-black font-bold text-lg rounded-xl transition-all hover:scale-105 backdrop-blur-sm bg-yellow-900/10 uppercase tracking-wide group"
              >
                <Link href={canCreateTournament ? '/dashboard/tournaments' : '/dashboard'}>
                  <Shield className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" /> Создать турнир
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="px-8 lg:px-16 py-6 bg-gradient-to-r from-red-900/30 to-yellow-900/20 border-y border-red-800/30">
          <div className="flex flex-col md:flex-row justify-around text-center text-sm md:text-base font-mono tracking-wide">
            <div className="flex flex-col items-center">
              <span className="text-yellow-400 font-bold text-2xl">256+</span>
              <span className="text-slate-300">участников</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-red-400 font-bold text-2xl">18+</span>
              <span className="text-slate-300">турниров</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-400 font-bold text-2xl">420+</span>
              <span className="text-slate-300">боёв</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-green-400 font-bold text-2xl">98%</span>
              <span className="text-slate-300">удовлетворённость</span>
            </div>
          </div>
        </section>

        {/* Турниры */}
        <section id="tournaments" className="px-8 lg:px-16 py-24">
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
            Ближайшие соревнования
          </h2>

          {tournaments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-28 h-28 mx-auto mb-8 bg-black border-4 border-red-900/50 rounded-full flex items-center justify-center shadow-2xl">
                <Trophy className="w-14 h-14 text-red-900/50" />
              </div>
              <p className="text-slate-400 text-2xl font-light">Нет запланированных турниров</p>
              <p className="text-slate-600 text-lg mt-3">Организуйте первое соревнование уже сегодня</p>
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {tournaments.slice(0, 3).map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          )}
        </section>

        {/* Футер */}
        <footer className="px-8 lg:px-16 py-12 border-t border-slate-800 text-center text-sm text-slate-500 space-y-5">
          <div className="flex flex-wrap justify-center gap-10 text-slate-400">
            <Link href="/about" className="hover:text-yellow-400 transition duration-300">О платформе</Link>
            <Link href="/docs" className="hover:text-yellow-400 transition duration-300">Документация</Link>
            <Link href="/contact" className="hover:text-yellow-400 transition duration-300">Контакты</Link>
            <Link href="/privacy" className="hover:text-yellow-400 transition duration-300">Конфиденциальность</Link>
          </div>
          <div className="flex justify-center space-x-6 text-xs text-slate-600">
            <span>⚡ FightRank Pro • 2025</span>
            <span>•</span>
            <span>Power of Combat Sports</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-20">Загрузка...</div>}>
      <HomePageContent />
    </Suspense>
  );
}

    