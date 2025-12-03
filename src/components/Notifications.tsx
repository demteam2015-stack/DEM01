'use client';

import { Bell, X } from 'lucide-react';
import { useState } from 'react';

export function Notifications() {
  const [open, setOpen] = useState(false);
  const notifications = [
    { id: 1, text: 'Ваш турнир одобрен', time: '10 мин назад' },
    { id: 2, text: 'Напоминание: жеребьёвка завтра', time: '2 часа назад' },
    { id: 3, text: 'Новый боец зарегистрирован в вашем клубе', time: '1 день назад' },
  ];

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 text-red-200 hover:text-red-100">
        <Bell size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-black/95 border border-red-900/40 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-red-900/30 flex justify-between items-center">
            <h3 className="text-white font-bold">Уведомления</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-3 border-b border-gray-800 hover:bg-gray-900/50">
                <p className="text-gray-100 text-sm">{n.text}</p>
                <p className="text-gray-500 text-xs mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
