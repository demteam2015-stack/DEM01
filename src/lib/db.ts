import { PrismaClient } from '@prisma/client';

// Объявляем глобальную переменную для хранения инстанса Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Создаем инстанс Prisma, переиспользуя существующий в режиме разработки
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
