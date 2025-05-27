import ApiClient from "@/api/lib/ApiClient";


interface WhatsAppNotificationParams {
  phone: string;
  first_name: string;
  score: number;
  level: string;
  type: string;
}

export class NotificationApi extends ApiClient {
  post: any;
  constructor() {
    super("/api/v1/notifications");
  }

  async whatsAppNotification(
    phone: string,
    firstName: string,
    score: number,
    level: string,
    type: string
  ): Promise<Response> {
    const body: WhatsAppNotificationParams = {
      phone,
      first_name: firstName,
      score,
      level,
      type
    };
    
    return this.post(JSON.stringify(body), "/whatsapp");
  }
}