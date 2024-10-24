import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configurando os provedores de autenticação
  providers: [
    // Provedor de login por email e senha
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = { id: '1', name: 'User', email: 'valid@example.com' };  // Usuário mockado

        if (
          credentials.email === 'valid@example.com' &&
          credentials.password === 'correctpassword'
        ) {
          return user;  // Retorna usuário caso as credenciais estejam corretas
        } else {
          return null;  // Retorna null se as credenciais forem incorretas
        }
      },
    }),

    // Provedor de login com Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  
  pages: {
    signIn: '/login',  // Definindo a página de login
  },

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
};

export default NextAuth(authOptions);
