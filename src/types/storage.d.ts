declare module '@/utils/storage' {
  interface TokenType {
    access_token: string;
  }

  const Storage: {
    getToken(): TokenType | null;
  };

  export default Storage;
} 