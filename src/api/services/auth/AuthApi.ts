import ApiClient from "@/api/lib/ApiClient";

export class AuthApi extends ApiClient {
  constructor(token?: string) {
    super("/api/v1/auth", token);
  }

  sendOTP(body: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(body, "/otp");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  login(body: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(body, "/phone");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  me(): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.get("/me");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}
