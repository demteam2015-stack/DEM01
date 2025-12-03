'use client';

export function JudgePanel() {
  // В реальном приложении здесь будет логика для отправки результатов
  const handleRedWin = () => console.log('Red wins');
  const handleBlueWin = () => console.log('Blue wins');
  const handleFoul = () => console.log('Foul');

  return (
    <div className="bg-black/70 border border-red-600/50 rounded-lg p-6 text-center">
      <h3 className="text-white text-xl font-bold mb-6">Судейская панель</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={handleRedWin} className="py-3 bg-red-700 hover:bg-red-600 text-white rounded font-bold transition">
          🔴 Красный выиграл
        </button>
        <button onClick={handleBlueWin} className="py-3 bg-blue-700 hover:bg-blue-600 text-white rounded font-bold transition">
          🔵 Синий выиграл
        </button>
      </div>
      <button onClick={handleFoul} className="py-2 px-6 border border-yellow-500 text-yellow-300 rounded hover:bg-yellow-500 hover:text-black transition">
        ⚖️ Фол
      </button>
    </div>
  );
}
