
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Минималистичные градиенты — только по краям */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-l from-red-900/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-gradient-to-t from-yellow-900/10 to-transparent blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <header className="px-8 lg:px-16 py-6 flex justify-between items-center border-b border-red-900/30 backdrop-blur-lg bg-black/60 sticky top-0 z-50">
          <Link href="/" className="group flex items-center space-x-3">
            <DemTeamLogo className="text-red-500" />
            <span className="text-2xl font-black tracking-tight text-red-500 font-mono">
              Dem_Platform
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wider text-gray-300">
            <Link
              href="/dashboard/tournaments"
              className="hover:text-red-400 transition duration-300 relative group"
            >
              Турниры
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/dashboard/judging"
              className="hover:text-red-400 transition duration-300 relative group"
            >
              Судейство
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/updates"
              className="hover:text-red-400 transition duration-300 relative group"
            >
              Обновления
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {isAuthenticated ? (
              <Button
                asChild
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-xs font-bold rounded-md transition-all hover:scale-105 border border-red-900/40 bg-gradient-to-r from-red-700 to-red-800"
              >
                <Link href="/dashboard">Панель управления</Link>
              </Button>
            ) : (
              <Button
                asChild
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-xs font-bold rounded-md transition-all hover:scale-105 border border-red-900/40 bg-gradient-to-r from-red-700 to-red-800"
              >
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </header>

        {/* Hero */}
        <section className="px-8 lg:px-16 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter font-mono">
              ПЛАТФОРМА ДЛЯ
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 mt-2">
                ОРГАНИЗАЦИИ ТУРНИРОВ
              </span>
            </h1>
            <p className="text-gray-400 mt-8 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Интегрированная система управления соревнованиями.  
              Регистрация, жеребьёвка, судейство — всё в одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-14">
              <Button
                asChild
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 font-extrabold text-lg rounded-lg transition-all hover:scale-105 shadow-lg shadow-red-900/30"
              >
                <Link href={isAuthenticated ? '/dashboard' : '/signup'}>
                  🏆 Начать работу
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-red-600 hover:border-yellow-500 text-white hover:text-yellow-100 font-bold text-lg rounded-lg transition-all hover:scale-105 backdrop-blur-sm bg-red-900/20"
              >
                <Link href={canCreateTournament ? '/dashboard/tournaments' : '/dashboard'}>
                  ➕ Создать турнир
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-8 lg:px-16 py-4 bg-gradient-to-r from-red-900/20 to-yellow-900/10 border-y border-red-800/20">
          <div className="flex flex-col md:flex-row justify-around text-center text-sm md:text-base font-mono">
            <div><span className="text-yellow-400 font-bold">256+</span> участников</div>
            <div><span className="text-red-400 font-bold">18+</span> турниров</div>
            <div><span className="text-blue-400 font-bold">420+</span> боёв проведено</div>
            <div><span className="text-green-400 font-bold">98%</span> удовлетворённость</div>
          </div>
        </section>

        {/* Tournaments */}
        <section id="features" className="px-8 lg:px-16 py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-tight font-mono">
            БЛИЖАЙШИЕ СОРЕВНОВАНИЯ
          </h2>

          {tournaments.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-900 rounded-full flex items-center justify-center border-2 border-red-900/40">
                <Trophy className="w-12 h-12 text-slate-600" />
              </div>
              <p className="text-slate-500 text-xl">Нет запланированных турниров</p>
              <p className="text-slate-600 text-sm mt-2">Организуйте первое соревнование уже сегодня</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {tournaments.slice(0, 3).map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="px-8 lg:px-16 py-10 border-t border-slate-800 text-center text-sm text-slate-500 space-y-4">
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/updates" className="hover:text-red-400 transition">О платформе</Link>
            <Link href="/updates" className="hover:text-red-400 transition">Документация</Link>
            <Link href="/updates" className="hover:text-red-400 transition">Контакты</Link>
            <Link href="/updates" className="hover:text-red-400 transition">Конфиденциальность</Link>
          </div>
          <p className="text-slate-700 font-mono">
            &copy; {new Date().getFullYear()} Dem_Platform. Все права защищены.
          </p>
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

    