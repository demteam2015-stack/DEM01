
'use client';

import Link from 'next/link';
import React, { Suspense, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, ShieldCheck, Users, Calendar } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import type { Tournament } from '@/lib/tournaments-api';
import TournamentCard from '@/components/TournamentCard';
import { getTournaments as getAllTournaments } from '@/lib/tournaments-api';

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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Фон */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-gray-50 to-gray-100"></div>

      <div className="relative">
        {/* Шапка */}
        <header className="px-8 lg:px-16 py-6 flex justify-between items-center border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <Link href="/" className="flex items-center space-x-3">
            <DemTeamLogo className="text-blue-800" />
            <span className="text-2xl font-bold tracking-tight text-blue-900 font-sans">
              Dem_Platform
            </span>
          </Link>

          <nav className="hidden md:flex space-x-10 text-sm font-semibold text-gray-700">
            <Link href="/dashboard/tournaments" className="hover:text-amber-600 transition duration-200 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Турниры
            </Link>
            <Link href="/dashboard/judging" className="hover:text-amber-600 transition duration-200 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Судейство
            </Link>
            <Link href="/updates" className="hover:text-amber-600 transition duration-200 flex items-center gap-1">
              <Users className="w-4 h-4" /> Федерации
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {isAuthenticated ? (
              <Button
                asChild
                className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition transform hover:scale-105"
              >
                <Link href="/dashboard">Личный кабинет</Link>
              </Button>
            ) : (
              <Button
                asChild
                className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition transform hover:scale-105"
              >
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </header>

        {/* Герой */}
        <section className="px-8 lg:px-16 py-24 text-center text-gray-900">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Официальная платформа для
              <span className="block text-amber-600 mt-2">управления соревнованиями</span>
            </h1>
            <p className="text-gray-600 mt-8 text-lg max-w-3xl mx-auto">
              Dem_Platform — единая система для спортивных клубов и федераций.  
              Проводите турниры, утверждайте результаты, выдавайте разряды.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-14">
              <Button
                asChild
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-lg rounded-lg transition transform hover:scale-105 shadow-lg"
              >
                <Link href={isAuthenticated ? '/dashboard' : '/signup'}>
                  🏆 Подать заявку на турнир
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-blue-700 text-blue-800 hover:bg-blue-50 font-bold text-lg rounded-lg transition transform hover:scale-105"
              >
                <Link href="/documentation">
                  📄 Документация для федераций
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="px-8 lg:px-16 py-6 bg-white/80 backdrop-blur-sm border-y border-gray-200">
          <div className="flex flex-col md:flex-row justify-around text-center text-sm md:text-base font-medium">
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl font-bold text-amber-600">256+</span>
              <span className="text-gray-700 mt-1">Клубов</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl font-bold text-blue-800">18+</span>
              <span className="text-gray-700 mt-1">Федераций</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl font-bold text-green-600">420+</span>
              <span className="text-gray-700 mt-1">Турниров</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl font-bold text-purple-600">98%</span>
              <span className="text-gray-700 mt-1">Одобрение</span>
            </div>
          </div>
        </section>

        {/* Турниры */}
        <section className="px-8 lg:px-16 py-20">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Ближайшие соревнования
          </h2>

          {tournaments.length === 0 ? (
            <div className="text-center py-16 bg-white/70 rounded-xl shadow">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-xl">Нет запланированных турниров</p>
              <p className="text-gray-600 text-sm mt-2">Подайте заявку на проведение</p>
              {canCreateTournament && (
                <Button asChild className="mt-4 bg-blue-700 hover:bg-blue-800 text-sm">
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
        <footer className="px-8 lg:px-16 py-10 border-t border-gray-200 text-center text-sm text-gray-600 bg-white/70">
          <div className="flex flex-wrap justify-center gap-10 mb-5 text-gray-700">
            <Link href="/about" className="hover:text-amber-600 transition">О платформе</Link>
            <Link href="/docs" className="hover:text-amber-600 transition">Для федераций</Link>
            <Link href="/contact" className="hover:text-amber-600 transition">Контакты</Link>
            <Link href="/privacy" className="hover:text-amber-600 transition">Конфиденциальность</Link>
          </div>
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Dem_Platform. Официальная платформа для спортивных соревнований.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-gray-800 text-center py-20">Загрузка...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
