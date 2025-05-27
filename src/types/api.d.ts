declare module '@/api/UserApi' {
  export class UserApi {
    constructor(token: string);
    getWealthometer(): Promise<Response>;
    // Add other API methods
  }
} 