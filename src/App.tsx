import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import { FlightSearch } from './components/FlightSearch';
import { FlightCard } from './components/FlightCard';
import { FlightDetails } from './components/FlightDetails';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { AviationApiService } from './services/aviationApi';
import type { Flight, FlightSearchParams } from './types/flight';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const aviationService = AviationApiService.getInstance();

  const handleSearch = async (params: FlightSearchParams) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await aviationService.searchFlights(params);
      setFlights(results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch flight data. Please check your API key and try again.');
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlightClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsDetailsOpen(true);
  };

  const handleRetry = () => {
    setError(null);
    setHasSearched(false);
    setFlights([]);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Flight Tracker</h1>
              <p className="text-gray-600">Real-time flight tracking and information</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Plane className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Setup Instructions</h3>
              <p className="text-blue-800 mt-1">
                To use this flight tracker with the proxy server:
              </p>
              <ol className="list-decimal list-inside text-blue-800 mt-2 space-y-1">
                <li>Sign up at <a href="https://aviation-edge.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Aviation-Edge.com</a></li>
                <li>Get your API key from the dashboard</li>
                <li>Add it as <code className="bg-blue-100 px-2 py-1 rounded text-sm">AVIATION_EDGE_API_KEY</code> to your .env file</li>
                <li>Run <code className="bg-blue-100 px-2 py-1 rounded text-sm">npm run dev:full</code> to start both the proxy server and frontend</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Search Component */}
        <FlightSearch onSearch={handleSearch} isLoading={isLoading} />

        {/* Results */}
        <div className="space-y-6">
          {error && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {!error && isLoading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 text-blue-600">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-medium">Searching flights...</span>
              </div>
            </div>
          )}

          {!error && !isLoading && hasSearched && flights.length === 0 && (
            <EmptyState message="Try adjusting your search criteria or check if the flight information is available." />
          )}

          {!error && !isLoading && flights.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Flight Results ({flights.length})
                </h2>
              </div>
              <div className="grid gap-6">
                {flights.map((flight, index) => (
                  <FlightCard
                    key={`${flight.flight.iata}-${index}`}
                    flight={flight}
                    onClick={() => handleFlightClick(flight)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Flight Details Modal */}
      <FlightDetails
        flight={selectedFlight}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
}

export default App;