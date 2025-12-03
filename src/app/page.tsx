'use client';

import Link from 'next/link';
import React, { useEffect, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Zap } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { getTournaments } from '@/lib/tournaments-api';
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
    // In a real app, you would render a toast component here
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
        // Since getTournaments now requires an organizerId, and we don't have a real user,
        // let's fetch all tournaments for the demo.
        const data = await getAllTournaments();
        setTournaments(data);
      } catch (e) {
        console.error("Failed to load tournaments", e);
      }
    }

    // This is a workaround to make the client component work with our localStorage adapter
    // We need to re-import the function to make it available on the client
    const getAllTournaments = async () => {
        const { getAllTournaments: fetchAll } = await import('@/lib/tournaments-api');
        return await fetchAll();
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
        title: "Кэш очищен",
        description: "Локальные данные удалены.",
      });
      window.history.replaceState(null, '', '/');
    }
  }, [searchParams, toast]);

  const isAuthenticated = !isUserLoading && !!user;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Абстрактные блики (в стиле арены) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-2/3 h-96 bg-gradient-to-l from-red-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-red-900/5"></div>
      </div>

      <div className="relative">
        {/* Шапка — чисто и мощно */}
        <header className="px-8 lg:px-16 py-6 flex justify-between items-center border-b border-red-900/20">
          <Link href="/" className="group flex items-center space-x-3">
            <DemTeamLogo className="text-white" />
            <span className="text-xl md:text-2xl font-bold tracking-wider text-white uppercase">
              dem_platform
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-widest">
            <Link href="/dashboard/tournaments" className="hover:text-red-400 transition border-b-2 border-transparent hover:border-red-500 pb-1">
              Турниры
            </Link>
            <Link href="/dashboard/judging" className="hover:text-red-400 transition border-b-2 border-transparent hover:border-red-500 pb-1">
              Судейство
            </Link>
            <Link href="/updates" className="hover:text-red-400 transition border-b-2 border-transparent hover:border-red-500 pb-1">
              Обновления
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {isAuthenticated ? (
              <Button asChild size="sm" className="bg-white text-black hover:bg-gray-200 font-bold uppercase text-xs px-4 py-2 tracking-wider">
                <Link href="/dashboard">Панель</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 font-bold uppercase text-xs px-4 py-2 tracking-wider">
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </header>

        {/* Герой-секция — как на постере UFC */}
        <section className="px-8 lg:px-16 py-24 text-center relative">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-tight tracking-wider">
              FIGHT
              <span className="block text-red-600">ORGANIZED</span>
            </h1>
            <p className="text-gray-400 mt-8 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Система управления турнирами. Регистрация, жеребьёвка, судейство — всё в одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 font-black uppercase text-sm px-8 tracking-wider">
                <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Zap className="w-5 h-5 mr-2" /> Начать
                </Link>
              </Button>
              {canCreateTournament && (
                <Button asChild variant="outline" size="lg" className="border-red-600 text-red-100 hover:bg-red-600 font-bold uppercase text-sm px-8 tracking-wider">
                  <Link href="/dashboard/tournaments">
                    <Calendar className="w-5 h-5 mr-2" /> Создать турнир
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Статистика — как в UFC pre-fight screen */}
        <section className="px-8 lg:px-16 py-6 bg-black border-y border-red-900/30">
          <div className="flex flex-col md:flex-row justify-around items-center text-center text-sm md:text-base font-mono uppercase tracking-wider text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="text-red-500 font-bold">256+</span>
              <span>Участников</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold">18</span>
              <span>Турниров</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-bold">420+</span>
              <span>Поединков</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 font-bold">98%</span>
              <span>Рейтинг</span>
            </div>
          </div>
        </section>

        {/* Ближайшие события */}
        <section id="events" className="px-8 lg:px-16 py-20">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-center mb-16 tracking-wider">
            Следующие бои
          </h2>

          {tournaments.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-900 rounded-full flex items-center justify-center border border-red-900">
                <Trophy className="w-8 h-8 text-gray-700" />
              </div>
              <p className="text-gray-600 text-lg">Нет запланированных турниров</p>
              <p className="text-gray-500 text-sm mt-2">Стань первым организатором</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {tournaments.slice(0, 3).map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          )}
        </section>

        {/* Подвал — минимализм */}
        <footer className="px-8 lg:px-16 py-8 border-t border-gray-800 text-center text-xs text-gray-600 uppercase tracking-wider space-y-3">
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/about" className="hover:text-red-400 transition">О платформе</Link>
            <Link href="/docs" className="hover:text-red-400 transition">Документация</Link>
            <Link href="/contact" className="hover:text-red-400 transition">Контакты</Link>
            <Link href="/privacy" className="hover:text-red-400 transition">Конфиденциальность</Link>
          </div>
          <p className="text-gray-700">
            &copy; {new Date().getFullYear()} dem_platform. Все права защищены.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Загрузка...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
