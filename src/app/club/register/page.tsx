'use client';

import { useState } from 'react';

export default function RegisterClub() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="px-6 lg:px-10 py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-black text-white mb-2">Регистрация спортивного клуба</h1>
        <p className="text-gray-400 mb-8">
          После проверки вы получите статус «Официальный партнёр Dem_Platform»
        </p>

        {step === 1 && (
          <div className="bg-black/60 border border-red-900/30 rounded-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Название клуба</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white focus:outline-none focus:border-red-500"
                placeholder="Единоборцы-30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Руководитель</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white focus:outline-none focus:border-red-500"
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Город</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white focus:outline-none focus:border-red-500"
                placeholder="Москва"
              />
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
          <div className="bg-black/60 border border-red-900/30 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-bold text-white">Документы</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">ОГРН / ИНН</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Фото зала (3 шт.)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-700 file:text-white hover:file:bg-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Лицензия на деятельность (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-700 file:text-white hover:file:bg-red-600"
              />
            </div>

            <button
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded transition"
            >
              Отправить на проверку
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 bg-blue-900/20 border border-blue-900/40 rounded-lg">
            <div className="text-6xl mb-4">📬</div>
            <h2 className="text-xl font-bold text-white">Заявка отправлена!</h2>
            <p className="text-gray-400 mt-2">
              Администратор проверит документы в течение 3 рабочих дней
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
