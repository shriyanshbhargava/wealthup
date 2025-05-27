import { apiUrl } from "@/utils/constants";

interface Analysis {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  route: string;
}

export interface AnalysisResponse {
  error: boolean;
  message: string;
  id: string | null;
}

const BASE_URL = `${apiUrl}/api/v1/url-analysis`;

export class AnalysisApi {
  static async urlAnalysis({
    utm_source,
    utm_campaign,
    utm_medium,
    route,
  }: Analysis): Promise<AnalysisResponse> {
    if (!utm_campaign && !utm_medium && !utm_source) {
      return {
        error: true,
        message: "At least one UTM parameter is required",
        id: null,
      };
    }

    const body = {
      utm_source,
      utm_campaign,
      utm_medium,
      route,
    };

    return this.makeRequest<{ id: string }>(BASE_URL, {
      method: "POST",
      body,
    }).then(
      (data) => ({
        error: false,
        message: "",
        id: data.id,
      }),
      (error) => ({
        error: true,
        message: error.message || "Something went wrong",
        id: null,
      })
    );
  }

  static async addUserToAnalysis(id: string, userId: string): Promise<AnalysisResponse> {
    if (!id || !userId) {
      return {
        error: true,
        message: "Analysis ID and User ID are required",
        id: null,
      };
    }

    return this.makeRequest(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: { user_id: userId },
    }).then(
      () => ({
        error: false,
        message: "User added successfully",
        id,
      }),
      (error) => ({
        error: true,
        message: error.message || "Failed to add user to analysis",
        id: null,
      })
    );
  }

  private static async makeRequest<T>(
    url: string, 
    options: { 
      method: string; 
      body: Record<string, any>; 
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    const { method, body, headers = {} } = options;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}`);
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unknown error occurred");
    }
  }
}