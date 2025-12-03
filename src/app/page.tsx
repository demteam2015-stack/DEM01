'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Shield, Users } from 'lucide-react';
import { ThemeToggleButton } from '@/components/theme-toggle';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import { getAllTournaments as getTournaments } from '@/lib/tournaments-api';
import type { Tournament } from '@/lib/tournaments-api';
import TournamentCard from '@/components/TournamentCard';
import { DemTeamLogo } from '@/components/logo';

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
    <div className="min-h-screen bg-white text-black">
      {/* Минималистичный фон */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white"></div>

      <div className="relative">
        {/* Шапка — как у Apple.com */}
        <header className="px-8 lg:px-16 py-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 bg-white/90 backdrop-blur-md">
          <Link href="/" className="flex items-center space-x-3 group">
            <DemTeamLogo className="text-black" />
            <span className="text-2xl font-black tracking-tight text-black font-sans">
              Dem_Platform
            </span>
          </Link>

          <nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-700">
            <Link href="/dashboard/tournaments" className="hover:text-red-600 transition flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Турниры
            </Link>
            <Link href="/dashboard/judging" className="hover:text-red-600 transition flex items-center gap-1">
              <Shield className="w-4 h-4" /> Судейство
            </Link>
            <Link href="/updates" className="hover:text-red-600 transition flex items-center gap-1">
              <Users className="w-4 h-4" /> Федерации
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {isAuthenticated ? (
              <Button
                asChild
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition"
              >
                <Link href="/dashboard">Личный кабинет</Link>
              </Button>
            ) : (
              <Button
                asChild
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition"
              >
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </header>

        {/* Герой — как у Tesla / Apple */}
        <section className="px-8 lg:px-16 py-32 text-center max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
            Платформа для
            <br />
            <span className="text-red-600">спортивных федераций</span>
          </h1>
          <p className="text-gray-600 mt-8 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Управляйте турнирами, судейством и аттестацией.  
            Все инструменты — в одном месте.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-14">
            <Button
              asChild
              size="lg"
              className="px-8 py-6 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none transition"
            >
              <Link href={isAuthenticated ? '/dashboard' : '/signup'}>
                🏆 Начать работу
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 border-2 border-black text-black hover:bg-gray-50 font-bold text-lg rounded-none transition"
            >
              <Link href="/documentation">
                📚 Документация
              </Link>
            </Button>
          </div>
        </section>

        {/* Статистика — как у Adidas (ударно, моно) */}
        <section className="px-8 lg:px-16 py-6 bg-black text-white text-center text-lg md:text-xl font-mono tracking-wider">
          256+ КЛУБОВ &nbsp;&nbsp;|&nbsp;&nbsp; 18+ ФЕДЕРАЦИЙ &nbsp;&nbsp;|&nbsp;&nbsp; 420+ ТУРНИРОВ
        </section>

        {/* Турниры */}
        <section className="px-8 lg:px-16 py-20">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16 tracking-tight">
            Ближайшие соревнования
          </h2>

          {tournaments.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-gray-500 text-xl">Нет запланированных турниров</p>
              {canCreateTournament && (
                <Button
                  asChild
                  className="mt-6 px-6 py-2 bg-black hover:bg-gray-800 text-white text-sm font-bold rounded-none"
                >
                  <Link href="/dashboard/tournaments">➕ Создать турнир</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {tournaments.slice(0, 3).map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          )}
        </section>

        {/* Футер — как у Apple */}
        <footer className="px-8 lg:px-16 py-12 border-t border-gray-200 text-center text-sm text-gray-600">
          <div className="flex flex-wrap justify-center gap-10 mb-6 text-gray-700">
            <Link href="/about" className="hover:text-red-600 transition">О платформе</Link>
            <Link href="/docs" className="hover:text-red-600 transition">Для федераций</Link>
            <Link href="/contact" className="hover:text-red-600 transition">Контакты</Link>
            <Link href="/privacy" className="hover:text-red-600 transition">Конфиденциальность</Link>
          </div>
          <p className="text-gray-500 font-mono text-xs">
            &copy; {new Date().getFullYear()} Dem_Platform. Все права защищены.
          </p>
        </footer>

        {/* Информация о создателе — строго, но с уважением */}
        <div className="px-8 lg:px-16 py-6 text-center text-xs text-gray-500 border-t border-gray-100">
          Создатель: <span className="font-medium text-black">Демьяненко Алексей</span> • 
          <Link href="https://vk.com/kempo30" target="_blank" className="text-red-600 hover:underline ml-1">
            VK: kempo30
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <React.Suspense fallback={<div className="text-black">Загрузка...</div>}>
      <HomePageContent />
    </React.Suspense>
  );
}
