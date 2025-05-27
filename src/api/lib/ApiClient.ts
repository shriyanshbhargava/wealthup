import { apiUrl } from "@/utils/constants";
export default class ApiClient {
  token?: string;
  url: string;
  private activeRequests: Map<string, Promise<Response>> = new Map();
  
  constructor(url: string, token?: string) {
    this.token = token;
    this.url = apiUrl + url;
  }

  private _fetch(
    method: "post" | "delete" | "put" | "get",
    url: string,
    body?: string
  ): Promise<Response | any> {
    // Create a request key based on method, URL, and body
    const requestKey = `${method}-${url}-${body || ""}`;
    
    // Check if this exact request is already in flight
    if (this.activeRequests.has(requestKey)) {
      console.log(`Preventing duplicate request: ${requestKey}`);
      return this.activeRequests.get(requestKey)!;
    }
    
    // Create the request promise
    const requestPromise = new Promise<Response>(async (resolve, reject) => {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token ?? ""}`,
          },
          body: method !== "get" ? body : undefined,
        });
        
        // Properly handle non-successful responses
        if (!response.ok) {
          console.error(`API error: ${method} ${url} returned ${response.status}`);
          reject(new Error(`HTTP error! Status: ${response.status}`));
          return;
        }
        
        resolve(response);
      } catch (err) {
        console.error(`API request failed: ${method} ${url}`, err);
        reject(err);
      } finally {
        // Remove from active requests when done
        this.activeRequests.delete(requestKey);
      }
    });
    
    // Store the request
    this.activeRequests.set(requestKey, requestPromise);
    return requestPromise;
  }

  get(url?: string): Promise<Response | any> {
    let fetchUrl = this.url;
    if (url) fetchUrl = this.url + url;
    return this._fetch("get", fetchUrl);
  }

  post(body: string, url?: string): Promise<Response | any> {
    let fetchUrl = this.url;
    if (url) fetchUrl = this.url + url;
    return this._fetch("post", fetchUrl, body);
  }

  update(url?: string, body?: string): Promise<Response | any> {
    let fetchUrl = this.url;
    if (url) fetchUrl = this.url + url;
    return this._fetch("put", fetchUrl, body);
  }

  delete(url?: string): Promise<Response | any> {
    let fetchUrl = this.url;
    if (url) fetchUrl = this.url + url;
    return this._fetch("delete", fetchUrl);
  }

  protected put(body: string, path: string): Promise<Response> {
    return this._fetch("put", `${this.url}${path}`, body) as Promise<Response>;
  }
}