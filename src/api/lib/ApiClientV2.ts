import { apiUrl } from "@/utils/constants";
import Storage from "@/utils/storage";

export default class ApiClientV2 {
	static baseUrl = apiUrl;

	static async makeRequest(method: string, endpoint: string, body?: string): Promise<any> {
		const token = await Storage.getTokensV2()
		
		const headers: { [key: string]: string } = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		};

		const options: RequestInit = {
			method,
			headers,
		};

		if (body) {
			options.body = body;
		}

		const url = this.baseUrl + endpoint;
		try {
			const response = await fetch(url, options);
			const data = await response.json();

			if (!response.ok) {
				throw new ApiError(response.statusText, response.status, data);
			}

			return data;
		} catch (error: any) {
			throw new NetworkError("Network error occurred.", error);
		}
	}

	static async get(endpoint: string): Promise<any> {
		return this.makeRequest("GET", endpoint);
	}

	static async post(endpoint: string, body: string): Promise<any> {
		return this.makeRequest("POST", endpoint, body);
	}

	static async update(endpoint: string, body: string): Promise<any> {
		return this.makeRequest("PUT", endpoint, body);
	}

	static async delete(endpoint: string): Promise<any> {
		return this.makeRequest("DELETE", endpoint);
	}
}

class ApiError extends Error {
	status: number;
	data: any;

	constructor(message: string, status: number, data: any) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.data = data;
	}
}

class NetworkError extends Error {
	originalError: Error;

	constructor(message: string, originalError: Error) {
		super(message);
		this.name = "NetworkError";
		this.originalError = originalError;
	}
}