export function AthleteProfile() {
  return (
    <div className="bg-black/60 border border-red-900/30 rounded-lg p-6 max-w-md mx-auto mt-12">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4"></div>
        <h3 className="text-xl font-bold text-white">Иванов Иван</h3>
        <p className="text-red-400 text-sm">Клуб: "Единоборцы-30"</p>
        <p className="text-yellow-400 font-bold mt-2">🟨 Жёлтый пояс</p>
      </div>
      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <div>Возраст: 16 лет</div>
        <div>Разряд: 3-й юношеский</div>
        <div>Побед: 5 из 8</div>
      </div>
    </div>
  );
}
