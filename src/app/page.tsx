'use client';

import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Shield, Calendar, Users, Zap, Github } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
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

type Tournament = {
  id: string;
  title: string;
  date: string;
  location: string;
  discipline: string;
  maxParticipants: number;
  registeredCount: number;
  status: 'upcoming' | 'registration_open' | 'completed';
  organizerId: string;
};

const TournamentCard = ({ tournament }: { tournament: Tournament }) => (
    <Link href={`/tournaments/${tournament.id}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-red-600 transition group">
        <div className={`py-3 text-center text-xs font-black uppercase tracking-wider text-white ${tournament.discipline === "Certification" ? "bg-gray-700" : "bg-red-700"}`}>
          {tournament.discipline === "Certification" ? "АТТЕСТАЦИЯ" : "БОЙ"}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-black uppercase tracking-wide text-white group-hover:text-red-400 transition line-clamp-2">
            {tournament.title}
          </h3>
          <div className="mt-4 space-y-2 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Дата</span>
              <span className="text-white font-mono">{new Date(tournament.date).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex justify-between">
              <span>Место</span>
              <span className="text-white">{tournament.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Участники</span>
              <span className="text-white">{tournament.registeredCount}/{tournament.maxParticipants}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

// --- END STUB COMPONENTS ---


// Кастомный хук для отслеживания позиции мыши
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return mousePosition;
}

function HomePageContent() {
  const { user, userData, isUserLoading } = useUser();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();

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
    <>
      {/* 🔮 Кастомный курсор */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference transition duration-100"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          background: 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, rgba(0,200,204,0) 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(2px)',
        }}
      />

      {/* 🌌 Фон с динамическим градиентом */}
      <div
        className="absolute inset-0 -z-10 bg-black"
        style={{
          background: `
            radial-gradient(circle at ${x / 20}px ${y / 20}px, rgba(0, 200, 204, 0.1), transparent 30%),
            radial-gradient(circle at ${800 + x / 10}px ${600 - y / 15}px, rgba(30, 100, 255, 0.1), transparent 40%),
            radial-gradient(circle at ${400 - x / 18}px ${y / 12}px, rgba(255, 215, 0, 0.05), transparent 50%)
          `,
          transition: 'background 0.1s ease-out',
        }}
      />

      {/* 🌀 Анимированный слой сетки */}
      <div
        className="absolute inset-0 -z-5 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 200, 204, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 204, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${x * 0.01}px, ${y * 0.01}px)`,
          transition: 'transform 0.05s ease-out',
        }}
      />

      <div className="relative">
        {/* 🖌 Шапка с неоновым свечением */}
        <header className="px-8 lg:px-16 py-6 flex justify-between items-center border-b border-cyan-900/30 backdrop-blur-md relative">
          <Link href="/" className="group flex items-center space-x-3 relative">
            <DemTeamLogo className="text-cyan-400 drop-shadow-lg" />
            <span
              className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-300 to-cyan-400 font-mono relative"
              style={{
                textShadow: '0 0 15px rgba(0, 200, 204, 0.5)',
              }}
            >
              Dem_Platform
            </span>
            <span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-yellow-400 transition-all duration-300 group-hover:w-full"
            ></span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wider">
            {[
              { href: '/dashboard/tournaments', label: 'Турниры', icon: Calendar },
              { href: '/dashboard/judging', label: 'Судейство', icon: Shield },
              { href: '/updates', label: 'Федерации', icon: Users },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition duration-300 flex items-center gap-2 group relative"
              >
                <item.icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-yellow-400 transition-all duration-300 group-hover:w-full"
                ></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {isAuthenticated ? (
              <Button
                asChild
                className="group px-5 py-2.5 bg-transparent border border-cyan-500 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold text-sm rounded-lg transition-all hover:scale-105 relative overflow-hidden"
              >
                <Link href="/dashboard">
                  <span className="relative z-10">Личный кабинет</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-yellow-400 opacity-0 group-hover:opacity-20 transition"></span>
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="group px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-bold text-sm rounded-lg transition-all hover:scale-105 shadow-lg shadow-cyan-500/30"
              >
                <Link href="/login">Войти</Link>
              </Button>
            )}
          </div>
        </header>

        {/* 🎯 Герой с анимацией */}
        <section className="px-8 lg:px-16 py-28 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300c4cc' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="max-w-6xl mx-auto relative">
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-300 to-yellow-200"
                style={{ textShadow: '0 0 20px rgba(0, 200, 204, 0.4)' }}
              >
                Dem_Platform
              </span>
            </h1>
            <p
              className="text-cyan-300 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
              style={{ textShadow: '0 0 10px rgba(0, 200, 204, 0.3)' }}
            >
              Где традиции единоборств встречаются с цифровым будущим.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                asChild
                size="lg"
                className="group px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-black font-extrabold text-lg rounded-xl transition-all hover:scale-105 hover:shadow-2xl shadow-cyan-500/30 relative overflow-hidden"
              >
                <Link href={isAuthenticated ? '/dashboard' : '/signup'}>
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Начать сейчас
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group px-8 py-6 border border-yellow-500 text-yellow-300 hover:bg-yellow-500 hover:text-black font-bold text-lg rounded-xl transition-all hover:scale-105 backdrop-blur-sm"
              >
                <Link href="/documentation">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Link>
              </Button>
            </div>

            {/* 🕹️ Анимированное табло */}
            <div className="bg-gray-900/70 backdrop-blur-sm border border-cyan-900/40 rounded-lg p-4 inline-flex text-xs font-mono text-cyan-400 gap-6">
              <span>ТУРНИРОВ: <b className="text-white">18+</b></span>
              <span>СПОРТСМЕНОВ: <b className="text-white">256+</b></span>
              <span>БОЁВ: <b className="text-white">420+</b></span>
            </div>
          </div>
        </section>

        {/* 🏆 Турниры */}
        <section className="px-8 lg:px-16 py-20">
          <h2 className="text-4xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-yellow-300">
            Ближайшие соревнования
          </h2>

          {tournaments.length === 0 ? (
            <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-cyan-900/30">
              <div className="w-24 h-24 mx-auto mb-8 bg-gray-800 rounded-full flex items-center justify-center border border-cyan-900/50">
                <Trophy className="w-12 h-12 text-cyan-900/50 animate-pulse" />
              </div>
              <p className="text-gray-400 text-2xl">Пока нет турниров</p>
              <p className="text-gray-500 text-lg mt-3">Создайте первое соревнование</p>
              {canCreateTournament && (
                <Button
                  asChild
                  className="mt-6 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-black text-sm font-bold rounded-lg transition hover:scale-105"
                >
                  <Link href="/dashboard/tournaments">➕ Запустить турнир</Link>
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

        {/* 👤 Информация о создателе */}
        <footer className="px-8 lg:px-16 py-12 border-t border-cyan-900/30 text-center bg-gray-900/50">
          <div className="flex flex-col items-center space-y-3 mb-6">
            <h3 className="text-xl font-bold text-cyan-300">Создатель платформы</h3>
            <p className="text-white text-lg font-medium">Демьяненко Алексей</p>
            <p className="text-gray-400 text-sm">Разработчик • Kempo • Fullstack</p>
            <a
              href="https://vk.com/kempo30"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 text-sm underline decoration-dotted transition"
            >
              VK: kempo30
            </a>
          </div>
          <p className="text-gray-600 text-xs font-mono">
            &copy; {new Date().getFullYear()} Dem_Platform • NeoDojo Engine
          </p>
        </footer>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <React.Suspense fallback={<div className="text-gray-100">Загрузка...</div>}>
      <HomePageContent />
    </React.Suspense>
  );
}
