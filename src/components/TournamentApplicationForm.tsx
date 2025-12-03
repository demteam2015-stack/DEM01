'use client';

import { useState } from 'react';

export function TournamentApplicationForm() {
  const [step, setStep] = useState(1);

  return (
    <section className="my-16 bg-black/40 border border-red-900/30 rounded-lg p-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6">Подать заявку на турнир</h3>
      {step === 1 && (
        <div className="space-y-4">
          <input className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white" placeholder="Название турнира" />
          <input className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white" type="date" />
          <select className="w-full p-3 bg-gray-900 border border-red-900/40 rounded text-white">
            <option>Дзюдо</option>
            <option>Кэмпо</option>
          </select>
          <button
            onClick={() => setStep(2)}
            className="mt-4 px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded transition"
          >
            Далее
          </button>
        </div>
      )}
    </section>
  );
}
