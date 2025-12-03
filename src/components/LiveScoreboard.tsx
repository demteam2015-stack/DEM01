export function LiveScoreboard() {
  return (
    <div className="bg-black text-white font-mono text-center p-8 border-2 border-red-600 rounded-lg shadow-2xl shadow-red-600/30">
      <h2 className="text-2xl text-red-400 mb-4">ОНЛАЙН-ТРАНСЛЯЦИЯ</h2>
      <div className="text-4xl font-black mb-6">ФИНАЛ • МУЖЧИНЫ</div>
      <div className="grid grid-cols-2 gap-8 text-2xl">
        <div>
          <div className="text-red-500">ИВАНОВ</div>
          <div className="text-5xl mt-2">10</div>
        </div>
        <div>
          <div className="text-blue-500">ПЕТРОВ</div>
          <div className="text-5xl mt-2">8</div>
        </div>
      </div>
      <div className="mt-6 text-yellow-400 font-bold">ОСТАЛОСЬ: 02:18</div>
    </div>
  );
}
