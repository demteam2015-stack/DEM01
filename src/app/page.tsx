'use client';

import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Shield, Calendar, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import type { Tournament } from '@/lib/tournaments-api';
import TournamentCard from '@/components/TournamentCard';
import { getAllTournaments as getTournaments } from '@/lib/tournaments-api';


// --- STUB COMPONENTS ---
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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Глубокий фон и акценты */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-l from-cyan-500/10 to-transparent blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-gradient-to-t from-cyan-600/5 to-transparent blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Шапка */}
        <header className="px-8 lg:px-16 py-6 flex justify-between items-center border-b border-gray-800 backdrop-blur-lg bg-gray-900/90 sticky top-0 z-50">
          <Link href="/" className="flex items-center space-x-3 group">
            <DemTeamLogo className="text-cyan-400" />
            <span className="text-2xl font-bold tracking-tight text-cyan-300 font-sans group-hover:text-cyan-200 transition">
              Dem_Platform
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wider text-gray-300">
            <Link
              href="/dashboard/tournaments"
              className="hover:text-cyan-400 transition duration-300 flex items-center gap-1 group"
            >
              <Calendar className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              Турниры
            </Link>
            <Link
              href="/dashboard/judging"
              className="hover:text-cyan-400 transition duration-300 flex items-center gap-1 group"
            >
              <Shield className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              Судейство
            </Link>
            <Link
              href="/updates"
              className="hover:text-cyan-400 transition duration-300 flex items-center gap-1 group"
            >
              <Users className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              Федерации
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {isAuthenticated ? (
              <Button
                asChild
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 text-sm font-bold rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Link href="/dashboard">Личный кабинет</Link>
              </Button>
            ) : (
              <Button
                asChild
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 text-sm font-bold rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </header>

        {/* Герой */}
        <section className="px-8 lg:px-16 py-24 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Dem_Platform
              </span>
              <br />
              <span className="text-3xl md:text-4xl font-light text-cyan-300 mt-4 block">
                Система управления соревнованиями нового поколения
              </span>
            </h1>
            <p className="text-gray-400 mt-8 text-lg max-w-3xl mx-auto leading-relaxed">
              Для спортивных клубов и федераций.  
              Регистрация, жеребьёвка, судейство, аттестация — всё в одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-14">
              <Button
                asChild
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-gray-900 font-extrabold text-lg rounded-lg transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
              >
                <Link href={isAuthenticated ? '/dashboard' : '/signup'}>
                  🚀 Начать работу
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 border border-cyan-500 text-cyan-300 hover:bg-cyan-500 hover:text-gray-900 font-bold text-lg rounded-lg transition-all"
              >
                <Link href="/documentation">
                  📚 Документация
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="px-8 lg:px-16 py-6 bg-gray-800/60 border-y border-gray-800 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-around text-center text-sm md:text-base font-mono tracking-wider text-gray-300">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-cyan-400">256+</span>
              <span className="text-gray-400 mt-1">Клубов</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">18+</span>
              <span className="text-gray-400 mt-1">Федераций</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-400">420+</span>
              <span className="text-gray-400 mt-1">Турниров</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-yellow-400">98%</span>
              <span className="text-gray-400 mt-1">Одобрение</span>
            </div>
          </div>
        </section>

        {/* Турниры */}
        <section className="px-8 lg:px-16 py-20">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">
            Ближайшие соревнования
          </h2>

          {tournaments.length === 0 ? (
            <div className="text-center py-16 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-gray-400 text-xl">Нет запланированных турниров</p>
              <p className="text-gray-500 text-sm mt-2">Подайте заявку на проведение</p>
              {canCreateTournament && (
                <Button
                  asChild
                  className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-gray-900 text-sm"
                >
                  <Link href="/dashboard/tournaments">➕ Создать турнир</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {tournaments.slice(0, 3).map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          )}
        </section>

        {/* Футер */}
        <footer className="px-8 lg:px-16 py-10 border-t border-gray-800 text-center text-sm text-gray-500 bg-gray-900/70">
          <div className="flex flex-wrap justify-center gap-10 mb-5 text-gray-400">
            <Link href="/about" className="hover:text-cyan-400 transition">О платформе</Link>
            <Link href="/docs" className="hover:text-cyan-400 transition">Для федераций</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition">Контакты</Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition">Конфиденциальность</Link>
          </div>
          <p className="text-gray-600 font-mono text-xs">
            &copy; {new Date().getFullYear()} Dem_Platform • Powered by Combat & Code
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-gray-100">Загрузка...</div>}>
      <HomePageContent />
    </Suspense>
  );
}

    