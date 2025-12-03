'use client';

import { getTournaments } from "@/lib/tournaments-api";
import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import type { Tournament } from "@/lib/tournaments-api";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

export default function Home() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    async function loadTournaments() {
      const data = await getTournaments();
      setTournaments(data);
    }
    loadTournaments();
  }, []);


  // Только ближайшие 3 события
  const upcoming = tournaments
    .filter((t) => new Date(t.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Герой-секция (как на GLORY) */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white"
      >
        <Image
            src={placeholderImages.ringBg.src}
            alt={placeholderImages.ringBg.alt}
            fill
            style={{ objectFit: 'cover' }}
            priority
            data-ai-hint="boxing ring"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-wider bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            FIGHT PLATFORM
          </h1>
          <p className="text-xl md:text-2xl mt-6 text-gray-200 max-w-3xl mx-auto">
            Единая платформа для проведения турниров, аттестаций и рейтинга бойцов по всем стилям единоборств
          </p>
          <div className="mt-12 space-x-6">
            <a
              href="/events"
              className="inline-block bg-red-600 hover:bg-red-700 px-8 py-4 text-lg font-bold uppercase tracking-wider transition"
            >
              Смотреть события
            </a>
            <a
              href="/ranking"
              className="inline-block border-2 border-gray-400 hover:border-white px-8 py-4 text-lg font-semibold uppercase tracking-wider transition"
            >
              Рейтинг бойцов
            </a>
          </div>
        </div>

        {/* Стрелка вниз */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Ближайшие события */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 tracking-wider">Ближайшие события</h2>
          {upcoming.length === 0 ? (
            <p className="text-gray-400 text-center text-xl">Нет запланированных турниров</p>
          ) : (
            <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <a
              href="/events"
              className="inline-block border-b-2 border-red-600 text-red-400 hover:text-red-300 font-semibold"
            >
              Все события →
            </a>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Почему выбирают нас?</h2>
          <div className="grid md:grid-cols-3 gap-12 text-gray-300">
            <div>
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-2">Официальные турниры</h3>
              <p>Сертифицированные соревнования с международной системой судейства.</p>
            </div>
            <div>
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-2xl font-bold mb-2">Аттестации</h3>
              <p>Удобная регистрация на пояса и кю/даны с подтверждением в реестре.</p>
            </div>
            <div>
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-2">Рейтинг и статистика</h3>
              <p>Объективный рейтинг бойцов по дисциплинам и возрастным категориям.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Подвал */}
      <footer className="py-12 px-6 text-center text-gray-600 bg-gray-950 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Fight Platform. Все права защищены.</p>
        <p className="mt-2 text-sm">Поддержка: support@fightplatform.ru</p>
      </footer>
    </div>
  );
}
