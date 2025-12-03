'use client';

export function GosuslugiAuth() {
  const login = () => {
    // This is a placeholder and will not perform a real login.
    // In a real application, this would redirect to the Gosuslugi OAuth service.
    alert('Перенаправление на портал Госуслуг...');
    // window.location.href = 'https://esia-portal1.test.gosuslugi.ru';
  };

  return (
    <button
      onClick={login}
      className="flex items-center gap-3 px-4 py-2 border border-red-600 text-red-100 rounded hover:bg-red-600 hover:text-black transition w-full sm:w-auto"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.625 3.75H18.375C19.3373 3.75 20.125 4.53769 20.125 5.5V18.5C20.125 19.4623 19.3373 20.25 18.375 20.25H5.625C4.66269 20.25 3.875 19.4623 3.875 18.5V5.5C3.875 4.53769 4.66269 3.75 5.625 3.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.375 8.5H15.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.375 12H15.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.375 15.5H12.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Войти через Госуслуги
    </button>
  );
}
