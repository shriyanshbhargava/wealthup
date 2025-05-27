import ApiClient from "@/api/lib/ApiClient";
import { EmailApi } from "@/api/services/notification/EmailApi";
import { NotificationApi } from "../notification/NotificationApi";

interface TestApiRequestData {
  name?: string;
  level?: string;
  score?: number;
  phone: string;
  response: any;
  templateId?: number;
  subject?: string;
  email?: string;
  token?: string;
  testing?: boolean;
}

type Body = Omit<TestApiRequestData, 'templateId' | 'subject'>;

export class TestApi extends ApiClient {
  post: any;
  constructor() {
    super("/api/v1/");
  }

  async postData(route: string, data: TestApiRequestData): Promise<Response> {
    const body: Body = {
      phone: data.phone,
      response: data.response,
    };

    if (data.name && data.name.length) body['name'] = data.name;
    if (data.email) body["email"] = data.email;
    if (data.token) body["token"] = data.token;
    if (data.level) body["level"] = data.level;
    if (data.score !== undefined) body["score"] = data.score;
    if (data.testing) body['testing'] = data.testing;

    // const emailApi = new EmailApi();
    // const notificationsApi = new NotificationApi();

    try {
      const response: Response = await this.post(JSON.stringify(body), route);
      
      // if (data.email && data.templateId && data.subject) {
      //   await emailApi.sendTemplateEmail({
      //     email: data.email,
      //     name: data.name,
      //     template_id: data.templateId,
      //     subject: data.subject,
      //   });
      // }
      // await notificationsApi.whatsAppNotification(
      //   data.phone,
      //   data.name,
      //   data.score,
      //   data.level,
      //   route
      // );
      
      return response;
    } catch (err) {
      throw err;
    }
  }
}