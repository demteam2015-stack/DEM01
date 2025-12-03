
'use client'

import EventCard from '@/components/EventCard';
import Link from 'next/link';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useState } from 'react';
import type { Event } from '@/lib/db';
import { Filters } from '@/components/Filters';
import { BeltStandards } from '@/components/BeltStandards';
import { Partners } from '@/components/Partners';
import { MobileMenu } from '@/components/MobileMenu';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { RazryadSystem } from '@/components/RazryadSystem';
import { GosuslugiAuth } from '@/components/GosuslugiAuth';
import { Notifications } from '@/components/Notifications';


// Временные mock-данные
const allEvents: Event[] = [
  {
    id: '1',
    title: 'Всероссийский турнир по самбо "Надежды России"',
    date: '2024-12-20T10:00:00',
    location: 'г. Москва, МЦБИ',
    type: 'TOURNAMENT',
    sport: 'sambo',
  },
  {
    id: '2',
    title: 'Аттестационный семинар по айкидо под руководством...',
    date: '2024-11-25T12:00:00',
    location: 'г. Санкт-Петербург, Федерация Айкидо',
    type: 'CERTIFICATION',
    sport: 'judo',
  },
  {
    id: '3',
    title: 'Чемпионат России по боксу среди юниоров',
    date: '2025-01-18T09:00:00',
    location: 'г. Казань, "Центр Бокса"',
    type: 'TOURNAMENT',
    sport: 'boxing',
  },
];

export type EventViewModel = Event & {
  formattedDate: string;
};

const prepareEventsForDisplay = (events: Event[]): EventViewModel[] => {
  return events.map(event => ({
    ...event,
    formattedDate: format(new Date(event.date), "dd MMMM yyyy 'в' HH:mm", { locale: ru })
  }));
};

export default function Home() {
  const [events, setEvents] = useState(allEvents);

  const handleFilter = (filters: any) => {
    // Эта логика — просто заглушка. В реальном приложении здесь был бы запрос к API.
    let filtered = allEvents;
    if (filters.sport) {
        // фиктивная фильтрация
    }
    setEvents(filtered);
  };
  
  const displayEvents = prepareEventsForDisplay(events);


  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Минималистичный фон: точечная сетка */}
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
        }}
      ></div>

      {/* Шапка — чистая, с фокусом на интерфейсе */}
      <header className="relative z-10 border-b border-red-900/30 backdrop-blur-md bg-black/60 sticky top-0">
        <div className="px-6 lg:px-10 py-5 flex flex-col sm:flex-row sm:items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Dem_Platform
            </h1>
            <p className="text-red-400 text-sm mt-1">
              Единая система соревнований по единоборствам
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4 mt-4 sm:mt-0">
            <Notifications />
            <Link href="/club/register" className="text-sm text-red-400 hover:text-red-300 transition">
              🔷 Зарегистрировать клуб
            </Link>
            <GosuslugiAuth />
            
            {/* Кнопка: Создать событие — с подсветкой и scale */}
            <Link
              href="/events/create"
              className="group relative px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-medium text-sm rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                ➕ Создать событие
              </span>
              <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-20 bg-white transition duration-300"></span>
            </Link>
          </div>
          <MobileMenu />
        </div>
      </header>

      {/* Основной контент */}
      <main className="px-6 lg:px-10 py-12 max-w-7xl mx-auto">
        {/* Заголовок */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Официальные соревнования и аттестации
            </h2>
            <p className="text-gray-400 text-base max-w-3xl mx-auto leading-relaxed">
              Поддержка федераций, клубов и спортсменов по всей России.  
              Учёт турниров, присвоение разрядов, жеребьёвка, судейство.
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={0.1}>
          <div className="h-1.5 w-full bg-gradient-to-r from-white via-red-600 to-black mb-14 rounded-full shadow-inner"></div>
        </AnimatedSection>

        {/* Статистика */}
        <AnimatedSection delay={0.2}>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 text-center mb-14">
            {[
              { value: '256+', label: 'Клубов' },
              { value: '18+', label: 'Федераций' },
              { value: '420+', label: 'Турниров' },
              { value: '98%', label: 'Одобрение' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-black/60 border border-red-900/30 rounded-lg p-4 backdrop-blur-sm hover:border-red-600/50 transition"
              >
                <div className="text-2xl font-black text-red-400">{stat.value}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={0.3}>
          <Filters onFilter={handleFilter} />
        </AnimatedSection>

        {/* Список событий */}
        <AnimatedSection delay={0.3}>
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Ближайшие события</h3>
             <Link
              href="/calendar"
              className="text-red-400 text-sm group hover:text-red-300 transition"
            >
              Полный календарь{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </AnimatedSection>

        {displayEvents.length === 0 ? (
          <AnimatedSection delay={0.4}>
            <div className="text-center py-20 bg-black/40 rounded-xl border border-red-900/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">Нет запланированных мероприятий</p>
            </div>
          </AnimatedSection>
        ) : (
           <AnimatedSection>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {displayEvents.map((event, i) => (
                <AnimatedSection key={event.id} delay={i * 0.1}>
                  <div className="group bg-black/60 border border-red-900/30 hover:border-red-500/60 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 backdrop-blur-sm h-full">
                    <EventCard event={event} />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        )}
        
        <BeltStandards />
        <RazryadSystem />
        <Partners />

      </main>

      {/* Футер */}
      <footer className="px-6 lg:px-10 py-8 border-t border-red-900/30 text-center text-gray-600 text-xs bg-black/50">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="text-white text-sm font-medium">Dem_Platform</p>
          <p>Официальная платформа для единоборств в Российской Федерации</p>
          <p>
            Разработчик: Демьяненко Алексей • 
            <Link
              href="https://vk.com/kempo30"
              target="_blank"
              className="text-red-400 hover:underline mx-1"
            >
              VK: kempo30
            </Link>
          </p>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
