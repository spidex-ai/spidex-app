import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Taptools API client for interacting with the Taptools API
 * Documentation: https://openapi.taptools.io/
 */
export class TaptoolsClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey?: string) {
    console.log('TAPTOOLS_API_URL:::', process.env.TAPTOOLS_API_URL);
    console.log('TAPTOOLS_API_KEY:::', process.env.TAPTOOLS_API_KEY);
    this.apiKey = apiKey || process.env.TAPTOOLS_API_KEY || '';
    this.client = axios.create({
      baseURL: process.env.TAPTOOLS_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
    });
  }

  /**
   * Make a GET request to the Taptools API
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns Promise with the response data
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        params,
      };

      console.log(`Making GET request to: ${endpoint}`);
      const response = await this.client.get<T>(endpoint, config);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Make a POST request to the Taptools API
   * @param endpoint - API endpoint
   * @param data - Request body
   * @returns Promise with the response data
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      console.log(`Making POST request to: ${endpoint}`);
      const response = await this.client.post<T>(endpoint, data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Handle API errors
   * @param error - Error object
   */
  private handleError(error: any): void {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Taptools API error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Taptools API request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Taptools API error:', error.message);
    }
  }
}
