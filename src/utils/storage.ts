import { differenceInHours } from "date-fns";

type Token = {
  token: string;
    expiry: string;
}

type Tokens = {
  access: Token,
  refresh: Token
}
export default class Storage {
  static getToken(): { access_token: string; expires_at: string } | null {
    if (typeof window === "undefined") {
      return null;
    }
    
    if (window.location.href.includes('demo')) {
      return {
        access_token: "pk_demo-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        expires_at: ""
      }
    }
    
    try {
      const tokenStr = localStorage.getItem("token");
      if (tokenStr !== null) {
        return JSON.parse(tokenStr);
      }
    } catch (error) {
      console.error("Error parsing token from localStorage:", error);
    }
    return null;
  }
  
  static storeToken(tokens: { access_token: string; expires_at: string }) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", JSON.stringify(tokens));
    }
  }
  
  static storeTokensV2(tokens: Tokens) {
    if (typeof window !== "undefined") {
      localStorage.setItem("x-access-token", JSON.stringify(tokens.access));
      localStorage.setItem("x-refresh-token", JSON.stringify(tokens.refresh));
    }
  }
  
  static async getTokensV2() {
    if (typeof window === "undefined") {
      return null;
    }
    
    const accessTokenStr = localStorage.getItem("x-access-token");
    const refreshTokenStr = localStorage.getItem("x-refresh-token");
    
    if (!accessTokenStr || !refreshTokenStr) return null;
    
    const accessToken: Token = JSON.parse(accessTokenStr);
    const refreshToken: Token = JSON.parse(refreshTokenStr);
    
    const diffInHours = differenceInHours(
      Date.now(),
      Date.parse(accessToken.expiry)
    );
    
    if (diffInHours >= 1) {
      const res = await fetch("https://api.wealthup.me/api/v2/auth/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          refreshToken: refreshToken.token
        })
      });
      
      if (res.ok) {
        const json: Tokens = await res.json();
        this.storeTokensV2(json);
        return json.access.token;
      } else {
        return null;
      }
    }
    
    return accessToken.token;
  }
  
  static removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }
  
  static storeReferral(ref: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("ref", ref);
    }
  }
  
  static getReferral(): string | undefined {
    if (typeof window === "undefined") {
      return undefined;
    }
    return localStorage.getItem("ref") ?? undefined;
  }
}