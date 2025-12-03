'use client';

export function JudgePanel() {
  return (
    <div className="bg-black/70 border border-red-600/50 rounded-lg p-6 text-center">
      <h3 className="text-white text-xl font-bold mb-6">Судейская панель</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="py-3 bg-red-700 hover:bg-red-600 text-white rounded font-bold">🔴 Красный выиграл</button>
        <button className="py-3 bg-blue-700 hover:bg-blue-600 text-white rounded font-bold">🔵 Синий выиграл</button>
      </div>
      <button className="py-2 px-6 border border-yellow-500 text-yellow-300 rounded hover:bg-yellow-500 hover:text-black transition">
        ⚖️ Фол
      </button>
    </div>
  );
}
