export function RazryadSystem() {
  const levels = [
    { name: '3-й юношеский', age: '14–15', req: 'Участие в 1 турнире' },
    { name: '2-й юношеский', age: '16–17', req: 'Минимум 1 победа' },
    { name: '1-й юношеский', age: '18–20', req: '2 победы, нормативы' },
    { name: '3-й спортивный', age: '18+', req: 'Победа в региональном турнире' },
    { name: '2-й спортивный', age: '18+', req: 'Победа в межрегиональном турнире' },
    { name: '1-й спортивный', age: '18+', req: 'Победа в национальном турнире' },
  ];

  return (
    <section className="my-16 bg-black/40 border border-red-900/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Разряды по единоборствам (по типу ГТО)</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((lvl) => (
          <div key={lvl.name} className="p-4 bg-gray-900/50 border border-gray-700 rounded">
            <div className="font-bold text-yellow-400">{lvl.name}</div>
            <div className="text-gray-400 text-sm">Возраст: {lvl.age}</div>
            <div className="text-gray-300 text-sm mt-1">{lvl.req}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
