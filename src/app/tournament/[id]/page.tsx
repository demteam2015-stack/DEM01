'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import type { Tournament, TournamentEvent } from '@/lib/db';
import { ExportToCalendar } from '@/components/ExportToCalendar';
import { LiveScoreboard } from '@/components/LiveScoreboard';
import { JudgePanel } from '@/components/JudgePanel';
import { useEffect, useState } from 'react';

// Mock data, replace with actual API call
const MOCK_TOURNAMENTS: Tournament[] = [
    {
      id: '1',
      title: 'Всероссийский турнир по самбо "Надежды России"',
      date: '2024-12-20T10:00:00',
      location: 'г. Москва, МЦБИ',
      events: [
        { id: 'e1', title: 'Юноши, 14-15 лет', category: 'Юноши', weightClass: 'до 55 кг' },
        { id: 'e2', title: 'Девушки, 14-15 лет', category: 'Девушки', weightClass: 'до 48 кг' },
      ],
    },
     {
      id: '3',
      title: 'Чемпионат России по боксу среди юниоров',
      date: '2025-01-18T09:00:00',
      location: 'г. Казань, "Центр Бокса"',
       events: [
        { id: 'e3', title: 'Юниоры', category: 'Юниоры', weightClass: 'до 60 кг' },
      ],
    }
];


export default function TournamentPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const foundTournament = MOCK_TOURNAMENTS.find(t => t.id === id) || null;
    setTournament(foundTournament);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-center py-40 text-white">Загрузка...</div>;
  }
  
  if (!tournament) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto">
        <Link href="/" className="text-red-400 text-sm mb-4 inline-block">&larr; Назад к списку событий</Link>

        <div className="bg-black/60 border border-red-900/30 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-black text-white">{tournament.title}</h1>
                <p className="text-gray-400 mt-1">{new Date(tournament.date).toLocaleDateString('ru-RU')} • {tournament.location}</p>
                <p className="text-yellow-400 font-medium mt-2">Статус: <span className="text-green-400">Запланирован</span></p>
            </div>
            <ExportToCalendar event={tournament}/>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">События в рамках турнира</h2>
                <div className="space-y-4">
                {tournament.events.map((event) => (
                    <div key={event.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                    <h3 className="font-bold text-white">{event.title}</h3>
                    <p className="text-gray-400 text-sm">{event.category} • {event.weightClass}</p>
                    </div>
                ))}
                </div>

                <div className="mt-8">
                <button className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded transition">
                    🎯 Провести жеребьёвку
                </button>
                </div>
            </div>
            <div className="space-y-8">
                <LiveScoreboard />
                <JudgePanel />
            </div>
        </div>

      </div>
    </div>
  );
}
