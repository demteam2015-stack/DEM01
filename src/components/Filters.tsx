'use client';

import { useState } from 'react';

export function Filters({ onFilter }: { onFilter: (filters: any) => void }) {
  const [sport, setSport] = useState('');
  const [region, setRegion] = useState('');
  const [date, setDate] = useState('');

  const apply = () => {
    onFilter({ sport, region, date });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-black/40 p-4 rounded-lg border border-red-900/30">
      <select
        value={sport}
        onChange={(e) => setSport(e.target.value)}
        className="px-3 py-2 bg-gray-900 border border-red-900/40 rounded text-sm text-white focus:outline-none focus:border-red-500"
      >
        <option value="">Все виды спорта</option>
        <option value="judo">Дзюдо</option>
        <option value="kempo">Кэмпо</option>
        <option value="sambo">Самбо</option>
        <option value="boxing">Бокс</option>
      </select>

      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="px-3 py-2 bg-gray-900 border border-red-900/40 rounded text-sm text-white focus:outline-none focus:border-red-500"
      >
        <option value="">Все регионы</option>
        <option value="msk">Москва</option>
        <option value="spb">Санкт-Петербург</option>
        <option value="ekb">Екатеринбург</option>
      </select>

      <input
        type="month"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-3 py-2 bg-gray-900 border border-red-900/40 rounded text-sm text-white focus:outline-none focus:border-red-500"
      />

      <button
        onClick={apply}
        className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-sm rounded transition"
      >
        Применить
      </button>
    </div>
  );
}
