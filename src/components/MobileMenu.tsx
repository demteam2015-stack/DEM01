'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-white"
      >
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-red-900/40 z-50">
          <nav className="flex flex-col p-4 space-y-4 text-center">
            <Link href="/tournaments" className="text-gray-300 hover:text-red-400 transition">Турниры</Link>
            <Link href="/judging" className="text-gray-300 hover:text-red-400 transition">Судейство</Link>
            <Link href="/belts" className="text-gray-300 hover:text-red-400 transition">Пояса</Link>
             <Link
              href="/dashboard"
              className="group relative px-4 py-2.5 border border-red-600/50 text-red-100 hover:text-white font-medium text-sm rounded transition-colors duration-300"
            >
              Личный кабинет
            </Link>
            <Link
              href="/events/create"
              className="group relative px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-medium text-sm rounded transition-all duration-300 hover:scale-105"
            >
              Создать событие
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
