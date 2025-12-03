import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Вход</h1>
        <p className="text-center text-gray-600 mb-6">
          Эта страница является заглушкой. Функционал входа будет реализован позже.
        </p>
        <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
          <Link href="/">Вернуться на главную</Link>
        </Button>
      </div>
    </div>
  );
}
