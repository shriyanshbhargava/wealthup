import ApiClient from "@/api/lib/ApiClient";

export class EmailApi extends ApiClient {
  constructor(token?: string) {
    super("/api/v1/sendemail", token);
  }

  sendTemplateEmail({
    email,
    name,
    template_id,
    subject,
  }: {
    email: string | string[];
    name: string;
    template_id: number;
    subject?: string;
  }): Promise<Response | any> {
    let recepients: Array<{ email: string }> = [];
    if (Array.isArray(email)) {
      email.forEach((e) => recepients.push({ email: e }));
    } else {
      recepients.push({ email });
    }

    const data: any = {
      recepients,
      name,
      template_id,
    };

    if (subject) data["data"] = { subject };

    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(JSON.stringify(data));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  sendMail({
    email,
    body,
    subject,
  }: {
    email: string | string[];
    body: string;
    subject: string;
  }): Promise<Response | any> {
    const data = {
      mail: Array.isArray(email) ? [...email] : [email],
      html: body,
      subject,
    };
    return new Promise(async (resolve, reject) => {
      try {
        const response: Response = await this.post(
          JSON.stringify(data),
          "/send"
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}
