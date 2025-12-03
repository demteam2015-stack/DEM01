export default function ClubProfile() {
  const club = {
    name: 'Единоборцы-30',
    city: 'Москва',
    coach: 'Иванов Иван',
    founded: 2015,
    sports: ['Дзюдо', 'Кэмпо', 'Самбо'],
    verified: true,
    events: 12,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="px-6 lg:px-10 py-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-3xl font-black text-white">{club.name}</h1>
          {club.verified && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-700 to-red-800 text-white text-xs font-bold rounded-full flex items-center gap-1">
              ✅ Проверено
            </span>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-black/60 border border-red-900/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">О клубе</h2>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><strong>Город:</strong> {club.city}</p>
              <p><strong>Тренер:</strong> {club.coach}</p>
              <p><strong>Год основания:</strong> {club.founded}</p>
              <p><strong>Виды спорта:</strong> {club.sports.join(', ')}</p>
            </div>
          </div>

          <div className="bg-black/60 border border-red-900/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Статистика</h2>
            <div className="space-y-2 text-gray-300 text-sm">
              <p><strong>Проведено турниров:</strong> {club.events}</p>
              <p><strong>Спортсменов:</strong> 86</p>
              <p><strong>Побед на турнирах:</strong> 42</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Ближайшие события</h3>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-300">Клуб ещё не запланировал турниры</p>
          </div>
        </div>
      </div>
    </div>
  );
}
