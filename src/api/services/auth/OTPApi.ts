import ApiClient from "@/api/lib/ApiClient";
export class OTPApi extends ApiClient {
  constructor(token?: string) {
    super("/api/v1/otp", token);
  }

  sendOTP(body: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(body, "/send");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  verifyOTP(body: string): Promise<Response | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(body, "/verify");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}
