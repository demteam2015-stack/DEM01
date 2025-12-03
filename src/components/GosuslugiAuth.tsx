'use client';

export function GosuslugiAuth() {
  const login = () => {
    // Перенаправление на OAuth Госуслуг
    // В реальном приложении здесь будет более сложная логика
    window.location.href = 'https://esia-portal1.test.gosuslugi.ru';
  };

  return (
    <button
      onClick={login}
      className="flex items-center gap-3 px-4 py-2 border border-red-600 text-red-100 rounded hover:bg-red-600 hover:text-black transition w-full sm:w-auto"
    >
      <svg 
        className="w-5 h-5" 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4z" fill="#0D47A1"></path>
        <path d="M24 10c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 14c-4.42 0-8 3.58-8 8v2h16v-2c0-4.42-3.58-8-8-8z" fill="#fff"></path>
      </svg>
      Войти через Госуслуги
    </button>
  );
}
