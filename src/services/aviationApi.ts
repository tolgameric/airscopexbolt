const API_BASE_URL = import.meta.env.VITE_PROXY_URL || 'http://localhost:3001/api';

export class AviationApiService {
  private static instance: AviationApiService;
  
  public static getInstance(): AviationApiService {
    if (!AviationApiService.instance) {
      AviationApiService.instance = new AviationApiService();
    }
    return AviationApiService.instance;
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  async searchFlights(params: any): Promise<any[]> {
    return this.makeRequest('/flights', params);
  }

  async getAirports(params: any = {}): Promise<any[]> {
    return this.makeRequest('/airports', params);
  }

  async getFlightByNumber(flightNumber: string): Promise<any[]> {
    return this.makeRequest('/flights', { flight_iata: flightNumber });
  }

  async getFlightsByRoute(departure: string, arrival: string): Promise<any[]> {
    return this.makeRequest('/flights', { 
      dep_iata: departure,
      arr_iata: arrival 
    });
  }

  async getFlightsByAirline(airlineCode: string): Promise<any[]> {
    return this.makeRequest('/flights', { airline_iata: airlineCode });
  }
}