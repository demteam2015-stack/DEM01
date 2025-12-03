export default function VerifyCert({ params }: { params: { id: string } }) {
  // Здесь будет проверка в БД
  const isValid = true;
  const data = {
    name: 'Иванов Иван',
    club: 'Единоборцы-30',
    belt: 'Зелёный пояс',
    date: '15.04.2025',
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-black/60 border border-green-600 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-white">Сертификат действителен</h1>
        <div className="mt-6 space-y-2 text-sm text-gray-300 text-left">
          <p><strong>ФИО:</strong> {data.name}</p>
          <p><strong>Клуб:</strong> {data.club}</p>
          <p><strong>Пояс:</strong> {data.belt}</p>
          <p><strong>Дата выдачи:</strong> {data.date}</p>
        </div>
        <p className="text-xs text-gray-500 mt-6">ID: {params.id}</p>
      </div>
    </div>
  );
}
