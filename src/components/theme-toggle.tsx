'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8"></div>;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded border border-red-900/40 text-red-200 hover:text-red-100 hover:border-red-500 transition"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
