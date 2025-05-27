import ApiClient from "@/api/lib/ApiClient";

export class CmsApi extends ApiClient {
  constructor() {
    super("/api");
  }

  async getFinancialGlossary(slug?: string): Promise<any> {
    try {
      const response: Response = await this.get(
        `/financial-glossary?${slug ? `where[slug][equals]=${slug}` : "limit=50&depth=0&sort=term"}`
      );

      const json = await response.json();

      if (response.status === 200) {
        return json.docs;
      }

      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async searchFinacialGlossary(searchTerm: string): Promise<any> {
    const url = `/financial-glossary?where[or][0][and][0][term][contains]=${searchTerm}&limit-50&page=1&depth=0&sort=term`;

    try {
      const response: Response = await this.get(url);

      const json = await response.json();

      if (response.status === 200) {
        return json.docs;
      }

      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
