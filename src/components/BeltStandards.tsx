export function BeltStandards() {
  return (
    <section className="my-16 bg-black/40 border border-red-900/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-white mb-6">Нормативы присвоения поясов</h3>
      <div className="space-y-4 text-sm">
        <div className="flex gap-4">
          <span className="text-red-400 font-bold">Белый пояс</span>
          <span className="text-gray-300">— Начальный уровень, зачисление в клуб</span>
        </div>
        <div className="flex gap-4">
          <span className="text-yellow-400 font-bold">Жёлтый пояс</span>
          <span className="text-gray-300">— 3 месяца тренировок, 10 техник</span>
        </div>
        <div className="flex gap-4">
          <span className="text-green-400 font-bold">Зелёный пояс</span>
          <span className="text-gray-300">— 6 месяцев, 20 техник, участие в турнире</span>
        </div>
        <div className="flex gap-4">
          <span className="text-blue-400 font-bold">Синий пояс</span>
          <span className="text-gray-300">— 1 год, 30 техник, 1 победа</span>
        </div>
      </div>
    </section>
  );
}
