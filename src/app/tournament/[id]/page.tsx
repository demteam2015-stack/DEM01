import { getTournamentById } from '@/lib/tournaments-api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TournamentPage({ params }: { params: { id: string } }) {
  const tournament = await getTournamentById(params.id);

  if (!tournament) return notFound();

  // Fake data for events, as we don't have this in our DB yet
  const events = [
    { id: 1, title: 'Мужчины, до 70кг', category: 'Мужчины', weightClass: 'до 70кг' },
    { id: 2, title: 'Женщины, до 60кг', category: 'Женщины', weightClass: 'до 60кг' },
    { id: 3, title: 'Юниоры, до 80кг', category: 'Юниоры', weightClass: 'до 80кг' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto">
        <Link href="/" className="text-red-400 text-sm mb-4 inline-block">&larr; Назад</Link>

        <div className="bg-black/60 border border-red-900/30 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-black text-white">{tournament.title}</h1>
          <p className="text-gray-400 mt-1">{new Date(tournament.date).toLocaleDateString('ru-RU')} • {tournament.location}</p>
          <p className="text-yellow-400 font-medium mt-2">Статус: <span className="text-green-400">{tournament.status}</span></p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">События</h2>
        <div className="space-y-4">
          {events.map((event) => (
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
    </div>
  );
}
