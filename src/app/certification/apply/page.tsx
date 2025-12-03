'use client';

import { useState } from 'react';

export default function ApplyCertification() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="px-6 lg:px-10 py-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-black text-white mb-2">Аттестация по поясам</h1>
        <p className="text-gray-400 mb-8">Пройдите нормативы и получите официальный сертификат</p>

        {step === 1 && (
          <div className="space-y-6 bg-black/60 border border-red-900/30 rounded-lg p-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ФИО спортсмена</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white focus:outline-none focus:border-red-500"
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Клуб</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white focus:outline-none focus:border-red-500"
                placeholder="Единоборцы-30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Текущий пояс</label>
              <select className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white">
                <option>Белый</option>
                <option>Жёлтый</option>
                <option>Зелёный</option>
                <option>Синий</option>
                <option>Коричневый</option>
                <option>Чёрный</option>
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded transition"
            >
              Далее
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 bg-black/60 border border-red-900/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white">Нормативы</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 accent-red-600" />
                <span className="text-gray-300">10 отжиманий с хлопком</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 accent-red-600" />
                <span className="text-gray-300">20 бросков за 3 минуты</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 accent-red-600" />
                <span className="text-gray-300">Выступление на турнире</span>
              </label>
            </div>

            <button
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded transition"
            >
              Подать заявку
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 bg-green-900/20 border border-green-900/40 rounded-lg">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-white">Заявка отправлена!</h2>
            <p className="text-gray-400 mt-2">Ожидайте приглашения на аттестацию</p>
          </div>
        )}
      </div>
    </div>
  );
}
