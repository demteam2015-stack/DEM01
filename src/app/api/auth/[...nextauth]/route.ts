import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Временная "база" организаторов (в продакшене — Prisma)
        const organizers = [
          {
            id: '1',
            email: 'org1@fight.com',
            password: '123',
            name: 'Организатор 1',
            role: 'ORGANIZER'
          },
          {
            id: '2',
            email: 'admin@fight.com',
            password: '123',
            name: 'Админ',
            role: 'ADMIN'
          }
        ];

        const user = organizers.find(
          u => u.email === credentials?.email && u.password === credentials?.password
        );

        if (user) {
          // В реальном приложении не возвращайте пароль
          return { id: user.id, email: user.email, name: user.name, role: user.role };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }) {
      // При первом входе `user` объект доступен
      if (user) {
        // @ts-ignore
        token.id = user.id;
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Добавляем роль и id в объект сессии, чтобы он был доступен на клиенте/сервере
      if (session?.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
