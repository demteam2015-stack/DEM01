export function LiveScoreboard() {
  // В реальном приложении эти данные будут приходить по WebSocket
  const score = {
    red: 10,
    blue: 8,
    time: "02:18",
    matchTitle: "ФИНАЛ • МУЖЧИНЫ",
    redName: "ИВАНОВ",
    blueName: "ПЕТРОВ",
  };

  return (
    <div className="bg-black text-white font-mono text-center p-8 border-2 border-red-600 rounded-lg shadow-2xl shadow-red-600/30">
      <h2 className="text-2xl text-red-400 mb-4">ОНЛАЙН-ТРАНСЛЯЦИЯ</h2>
      <div className="text-4xl font-black mb-6">{score.matchTitle}</div>
      <div className="grid grid-cols-2 gap-8 text-2xl">
        <div>
          <div className="text-red-500">{score.redName}</div>
          <div className="text-5xl mt-2">{score.red}</div>
        </div>
        <div>
          <div className="text-blue-500">{score.blueName}</div>
          <div className="text-5xl mt-2">{score.blue}</div>
        </div>
      </div>
      <div className="mt-6 text-yellow-400 font-bold">ОСТАЛОСЬ: {score.time}</div>
    </div>
  );
}
