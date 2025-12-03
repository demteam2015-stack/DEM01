import Link from 'next/link';
import { Button } from './ui/button';

type Props = {
  event: {
    id: string;
    title: string;
    sport: string;
    date: Date;
    status: string;
  };
};

export default function EventCard({ event }: Props) {
  const { id, title, sport, date, status } = event;

  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const statusConfig = {
    DRAFT: { label: 'Черновик', color: 'bg-gray-700 text-gray-200' },
    OPEN: { label: 'Регистрация открыта', color: 'bg-green-800 text-green-100' },
    CLOSED: { label: 'Регистрация закрыта', color: 'bg-yellow-800 text-yellow-100' },
    COMPLETED: { label: 'Завершён', color: 'bg-blue-800 text-blue-100' },
  };

  const { label, color } = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border border-gray-700">
      {/* Верхняя полоса цвета по виду спорта */}
      <div
        className={`h-2 ${
          sport === 'MMA' ? 'bg-red-600' :
          sport === 'BOXING' ? 'bg-yellow-600' :
          sport === 'JUDO' ? 'bg-blue-600' :
          sport === 'BJJ' ? 'bg-purple-600' : 'bg-gray-600'
        }`}
      ></div>

      <div className="p-6">
        <h3 className="text-xl font-extrabold text-white leading-tight">
          {title}
        </h3>
        <p className="text-red-400 font-bold mt-2 uppercase tracking-wide text-sm">
          {sport}
        </p>
        <p className="text-gray-300 text-sm mt-3 flex items-center gap-1">
          📅 {formattedDate}
        </p>

        <div className={`text-xs font-bold px-3 py-1 rounded-full w-fit mt-4 ${color}`}>
          {label}
        </div>
      </div>

      <div className="bg-black/40 px-6 py-4">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold"
        >
          <Link href={`/events/${id}`}>
            Перейти →
          </Link>
        </Button>
      </div>
    </div>
  );
}