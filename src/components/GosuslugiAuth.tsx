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
      <img src="/gosuslugi.svg" className="w-5 h-5" alt="Госуслуги" />
      Войти через Госуслуги
    </button>
  );
}
